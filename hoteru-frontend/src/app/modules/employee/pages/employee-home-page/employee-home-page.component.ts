import {Component, inject, OnInit, TemplateRef} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {Task} from "../../../../core/models/Task";
import {TaskService} from "../../../../services/task/task.service";
import {EmployeeService} from "../../../../services/employee/employee.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-employee-home-page',
  templateUrl: './employee-home-page.component.html',
  styleUrls: ['./employee-home-page.component.css']
})
export class EmployeeHomePageComponent implements OnInit {

  tasksColumns: string[] = ['id', 'name','employee', 'date', 'state', 'options']
  undoneTasks: Task[] = [];
  undoneDatasource: MatTableDataSource<any> = new MatTableDataSource<any>();

  myTasks: Task[] = [];
  myTasksDatasource: MatTableDataSource<any> = new MatTableDataSource<any>();

  id: any;
  type: any;

  constructor(private cookieService: CookieService, private router: Router, private taskService: TaskService,
              private employeeService: EmployeeService, private matDialog: MatDialog, private snackBar: MatSnackBar) {
  }

  logout() {
    this.cookieService.delete('id');
    this.router.navigate(['/','auth'])
  }

  ngOnInit(): void {
    this.id = this.cookieService.get('id');

    this.employeeService.getEmployee(this.id)
      .subscribe({
        next: response => {
          console.log(response);
          this.type = response.type;
          this.getUndoneTasks();
        }
      })

    this.getEmployeeTasks();
  }

  getUndoneTasks() {
    this.taskService.findEmployeeTypeTasks(this.type)
      .subscribe({
        next: (response: Task[]) => {
          console.log(response);
          this.undoneTasks = response;
          this.undoneDatasource.data = response;
        }
      })
  }

  getEmployeeTasks() {
    this.taskService.findEmployeeTasks(this.id)
      .subscribe({
        next: (response: Task[]) => {
          this.myTasks = response;
          this.myTasksDatasource.data = response;
        }
      })
  }

  showAssignTemplate(templateRef: TemplateRef<any>, element: any) {
    this.matDialog.open(templateRef, { data: element })
      .afterClosed().subscribe({
      next: (confirm: boolean) => {
        if(confirm) {

          this.taskService.updateTaskState(element.id, this.id, 'asignada')
            .subscribe({
              next: response => {
                this.snackBar.open('Tarea asignada exitosamente!', 'Aceptar');
                this.getEmployeeTasks();
                this.getUndoneTasks();
              }
            });

        }
      }
    });
  }

  showMarkAsDoneTemplate(templateRef: TemplateRef<any>, element: any) {
    this.matDialog.open(templateRef, { data: element })
      .afterClosed().subscribe({
      next: (confirm: boolean) => {
        if(confirm) {

          this.taskService.updateTaskState(element.id, this.id, 'finalizada')
            .subscribe({
              next: response => {
                this.snackBar.open('Has finalizado la tarea con éxito!', 'Aceptar');
                this.getEmployeeTasks();
                this.getUndoneTasks();
              }
            });

        }
      }
    })
  }
}
