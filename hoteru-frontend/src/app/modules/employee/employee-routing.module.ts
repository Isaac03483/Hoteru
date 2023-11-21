import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeeHomePageComponent} from "./pages/employee-home-page/employee-home-page.component";

const routes: Routes = [
  {
    path: '',
    component: EmployeeHomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
