import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {EmployeeService} from "../../../../services/employee/employee.service";
import {EmployeeTypeService} from "../../../../services/employee/employee-type.service";
import {Employee} from "../../../../core/models/Employee";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ModelType} from "../../../../core/models/ModelType";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  types: ModelType[] = [];
  hide: boolean = true;
  columns: string[] = ['id', 'username','name', 'type', 'options'];
  datasource: MatTableDataSource<any> = new MatTableDataSource<any>();
  employeeForm: FormGroup;
  employeeTypeControl: FormControl = new FormControl<any>('', Validators.required);
  @ViewChild(FormGroupDirective) formDir!: FormGroupDirective;

  typeColumns: string[] = ['id', 'type', 'options'];
  typeDatasource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(private employeeService: EmployeeService, private employeeTypeService: EmployeeTypeService,
              private builder: FormBuilder, private snackBar: MatSnackBar, private matDialog: MatDialog) {
    this.employeeForm = this.builder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      type: [null, Validators.required]
    });
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
}
