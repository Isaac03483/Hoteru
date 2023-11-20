import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {EmployeeService} from "../../../../services/employee/employee.service";
import {EmployeeTypeService} from "../../../../services/employee/employee-type.service";
import {Employee} from "../../../../core/models/Employee";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ModelType} from "../../../../core/models/ModelType";
import {MatDialog} from "@angular/material/dialog";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, AfterViewInit {

  types: ModelType[] = [];
  hide: boolean = true;
  columns: string[] = ['id', 'username','name', 'type', 'options'];
  datasource: MatTableDataSource<any> = new MatTableDataSource<any>();
  employeeForm: FormGroup;
  employeeTypeControl: FormControl = new FormControl<any>('', Validators.required);
  @ViewChild(FormGroupDirective) formDir!: FormGroupDirective;
  @ViewChild('paginator1') paginator1!: MatPaginator;
  @ViewChild('paginator2') paginator2!: MatPaginator;
  @ViewChild('sort1') sort1!: MatSort;
  @ViewChild('sort2') sort2!: MatSort;

  typeColumns: string[] = ['id', 'type', 'options'];
  typeDatasource: MatTableDataSource<any> = new MatTableDataSource<any>();


  updateNameControl: FormControl = new FormControl('');
  updatePasswordControl: FormControl = new FormControl('');
  updateTypeControl: FormControl = new FormControl(null);
  hideUpdate: boolean = true;

  constructor(private employeeService: EmployeeService, private employeeTypeService: EmployeeTypeService,
              private builder: FormBuilder, private snackBar: MatSnackBar, private matDialog: MatDialog) {
    this.employeeForm = this.builder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      type: [null, Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator2;
    this.datasource.sort = this.sort2;
  }

  ngOnInit(): void {
    this.getTypes();
    this.getEmployees();
  }

  getTypes() {
    this.employeeTypeService.findAll()
      .subscribe({
        next: (response: ModelType[]) => {
          this.types = response;
          this.typeDatasource.data = response;
          this.typeDatasource.paginator = this.paginator1;
          this.typeDatasource.sort = this.sort1;
        }
      })
  }

  getEmployees() {
    this.employeeService.findAll()
      .subscribe({
        next: (response: Employee[]) => {
          this.datasource.data = response;
        }
      })
  }

  saveEmployee() {
    if(this.employeeForm.invalid) {
      this.snackBar.open("Los campos están vacíos.", "Cerrar");
      return;
    }

    const { username, name, password, type } = this.employeeForm.value;

    this.employeeService.save(username, name, password, type)
      .subscribe({
        next: response => {
          this.snackBar.open("Usuario guardado con éxito!", "Aceptar");
          this.getEmployees();
          this.formDir.resetForm(this.employeeForm);
        }
      })
  }

  saveEmployeeType() {
    if(this.employeeTypeControl.invalid) {
      this.snackBar.open("El campo está vacío.", "Cerrar");
      return;
    }

    const type = this.employeeTypeControl.value;

    this.employeeTypeService.save(type)
      .subscribe({
        next: response => {
          this.snackBar.open("Tipo de empleado agregado con éxito!.", "Aceptar");
          this.getTypes();
          this.employeeTypeControl.reset();
        }
      })
  }

  showUserTypeTable(templateRef: TemplateRef<any>) {
    this.matDialog.open(templateRef);
  }

  deleteType(element: ModelType, templateRef: TemplateRef<any>) {
    const confirmRef = this.matDialog.open(templateRef, {data: element});

    confirmRef.afterClosed().subscribe({
      next: (response: boolean) => {
        console.log(response);
        if(response) {
          this.employeeTypeService.delete(element.id)
            .subscribe({
              next: response => {
                this.snackBar.open('Tipo eliminado con éxito!', 'Aceptar');
                this.getTypes();
              },
              error: err => {
                this.snackBar.open('No se pudo eliminar el tipo de empleado. Está siendo usado por un usuario.', 'Cerrar');
              }
            })
        }
      }
    })
  }

  applyTypeDatasourceFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.typeDatasource.filter = filterValue.trim().toLowerCase();

    if (this.typeDatasource.paginator) {
      this.typeDatasource.paginator.firstPage();
    }
  }

  applyDatasourceFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }

  showConfirmEmployeeTemplate(data: Employee, templateRef: TemplateRef<any>) {
    this.matDialog.open(templateRef, { data })
      .afterClosed()
      .subscribe({
        next: confirm => {
          this.employeeService.delete(data.id)
            .subscribe({
              next: response => {
                this.snackBar.open('Empleado eliminado con éxito!', 'Aceptar');
                this.getEmployees();
              },
              error: err => {
                this.snackBar.open('No se pudo eliminar al Empleado.', 'Cerrar');
              }
            })
        }
      })
  }

  getEmployeeTypeId(type: string) : number {
    const employeeType = this.types.filter(t => t.type === type);

    return employeeType[0].id;

  }

  ShowUpdateEmployeeTemplate(data: any, templateRef: TemplateRef<any>) {
    this.updateNameControl.setValue(data.name);
    this.updatePasswordControl.setValue(data.password);
    this.updateTypeControl.reset();
    this.matDialog.open(templateRef, { data });
  }

  updateEmployeeData(data: Employee) {
    let name = this.updateNameControl.value;
    let password = this.updatePasswordControl.value;
    let type = this.updateTypeControl.value;

    if(!name) {
      name = data.name;
    }

    if(!password) {
      password = data.password;
    }

    if(!type) {
      type = this.getEmployeeTypeId(data.type);
    }

    this.employeeService.update(data.id, name, password, type)
      .subscribe({
        next: response => {
          this.snackBar.open('Empleado actualizado con éxito', 'Aceptar');
          this.getEmployees();
          this.matDialog.closeAll();
        },
        error: err => {
          this.snackBar.open('No se pudo actualizar al empleado.', 'Cerrar');
        }
      })
  }
}
