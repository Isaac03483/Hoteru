import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminHomeComponent} from "./pages/admin-home/admin-home.component";
import {EmployeesComponent} from "./components/employees/employees.component";
import {AdminDashboardComponent} from "./components/admin-dashboard/admin-dashboard.component";
import {RoomsComponent} from "./components/rooms/rooms.component";
import {TasksComponent} from "./components/tasks/tasks.component";
import {ReservationsComponent} from "./components/reservations/reservations.component";

const routes: Routes = [
  {
    path: '',
    component: AdminHomeComponent,
    children: [
      {
        path: '',
        component: AdminDashboardComponent
      },
      {
        path: 'employees',
        component: EmployeesComponent
      },
      {
        path: 'rooms',
        component: RoomsComponent
      },
      {
        path: 'tasks',
        component: TasksComponent
      },
      {
        path: 'reservations',
        component: ReservationsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
