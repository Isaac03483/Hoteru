import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from "../../../../services/employee/employee.service";
import {EmployeeTypeService} from "../../../../services/employee/employee-type.service";
import {Employee} from "../../../../core/models/Employee";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  types: any[] = [];
  employees: Employee[] = [];
  hide: boolean = true;
  columns: string[] = ['id', 'username','name', 'type', 'options'];
  datasource: MatTableDataSource<any> = new MatTableDataSource<any>();
  employeeForm: FormGroup;
  employeeTypeControl: FormControl = new FormControl<any>('', Validators.required);
  @ViewChild(FormGroupDirective) formDir!: FormGroupDirective;

  constructor(private employeeService: EmployeeService, private employeeTypeService: EmployeeTypeService,
              private builder: FormBuilder, private snackBar: MatSnackBar) {
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
        next: response => {
          this.types = response;
          console.log(response);
        }
      })
  }

  getEmployees() {
    this.employeeService.findAll()
      .subscribe({
        next: response => {
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
          this.snackBar.open("Usuario guardado con éxito!", "Acceptar");
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
          this.snackBar.open("Tipo de empleado agregado con éxito!.", "Acceptar");
          this.getTypes();
          this.employeeTypeControl.reset();
        }
      })
  }
}
