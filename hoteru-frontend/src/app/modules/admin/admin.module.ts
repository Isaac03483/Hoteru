import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminNavigationComponent } from './components/admin-navigation/admin-navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RoomsComponent } from './components/rooms/rooms.component';
import { TasksComponent } from './components/tasks/tasks.component';


@NgModule({
  declarations: [
    AdminNavigationComponent,
    AdminHomeComponent,
    EmployeesComponent,
    AdminDashboardComponent,
    RoomsComponent,
    TasksComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule
  ]
})
export class AdminModule { }
