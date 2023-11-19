import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeTypeService} from "../../../../services/employee/employee-type.service";
import {ModelType} from "../../../../core/models/ModelType";
import {FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TaskService} from "../../../../services/task/task.service";
import {MatTableDataSource} from "@angular/material/table";
import {Task} from "../../../../core/models/Task";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, AfterViewInit {
  types: ModelType[] = [];

  taskForm: FormGroup;
  @ViewChild(FormGroupDirective) formDir!: FormGroupDirective;
  columns: string[] = ['id', 'name','type', 'employee', 'date','state', 'options'];
  datasource: MatTableDataSource<any> = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private employeeTypeService: EmployeeTypeService, private builder: FormBuilder,
              private snackBar: MatSnackBar, private taskService: TaskService) {
    this.taskForm = this.builder.group({
      name: ['', Validators.required],
      type: [null, Validators.required],
      description: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getTypes();
    this.getTasks();
  }

  ngAfterViewInit(): void {
    this.datasource.paginator = this.paginator;
    this.datasource.sort = this.sort;
  }

  getTypes() {
    this.employeeTypeService.findAll()
      .subscribe({
        next: (response: ModelType[]) => {
          this.types = response;
        }
      })
  }

  getTasks() {
    this.taskService.findAll()
      .subscribe({
        next: (response: Task[]) => {
          this.datasource.data = response;
        }
      })
  }

  saveTask() {
    if(this.taskForm.invalid) {
      this.snackBar.open('Los campos están vacíos.', 'Cerrar');
      return;
    }

    const { name, type, description } = this.taskForm.value;

    this.taskService.save(name, type, description)
      .subscribe({
        next: response => {
          this.snackBar.open('Tarea agregada con éxito!', "Aceptar");
          this.formDir.resetForm(this.taskForm);
          this.getTasks();

        },
        error: err => {
          this.snackBar.open('No se pudo agregar la tarea.', 'Cerrar');
        }
      })

  }

  applyFilter(event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.datasource.filter = filterValue.trim().toLowerCase();

    if (this.datasource.paginator) {
      this.datasource.paginator.firstPage();
    }
  }
}
