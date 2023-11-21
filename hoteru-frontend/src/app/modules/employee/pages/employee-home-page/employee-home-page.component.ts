import {AfterViewInit, Component, inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";
import {Task} from "../../../../core/models/Task";
import {TaskService} from "../../../../services/task/task.service";
import {EmployeeService} from "../../../../services/employee/employee.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-employee-home-page',
  templateUrl: './employee-home-page.component.html',
  styleUrls: ['./employee-home-page.component.css']
})
export class EmployeeHomePageComponent implements OnInit, AfterViewInit {
  tasksColumns: string[] = ['id', 'name','employee', 'date', 'state', 'options']

  undoneTasks: Task[] = [];
  undoneDatasource: MatTableDataSource<any> = new MatTableDataSource<any>();
  myTasks: Task[] = [];

  myTasksDatasource: MatTableDataSource<any> = new MatTableDataSource<any>();
  id: any;

  @ViewChild('undonePaginator') undonePaginator!: MatPaginator;
  @ViewChild('myTasksPaginator') myTasksPaginator!: MatPaginator;
  @ViewChild('undoneSort') undoneSort!: MatSort;
  @ViewChild('myTasksSort') myTasksSort!: MatSort;

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

  ngAfterViewInit(): void {
    this.undoneDatasource.paginator = this.undonePaginator;
    this.undoneDatasource.sort = this.undoneSort;
    this.myTasksDatasource.paginator = this.myTasksPaginator;
    this.myTasksDatasource.sort = this.myTasksSort;
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

  showTasksDetailsTemplate(templateRef: TemplateRef<any>, data: any) {
    this.matDialog.open(templateRef, { data });
  }

  applyUndoneFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.undoneDatasource.filter = filterValue.trim().toLowerCase();

    if (this.undoneDatasource.paginator) {
      this.undoneDatasource.paginator.firstPage();
    }
  }

  applyMyTasksFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.myTasksDatasource.filter = filterValue.trim().toLowerCase();

    if (this.myTasksDatasource.paginator) {
      this.myTasksDatasource.paginator.firstPage();
    }
  }
}
