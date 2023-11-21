import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RecepHomePageComponent} from "./pages/recep-home-page/recep-home-page.component";

const routes: Routes = [
  {
    path: '',
    component: RecepHomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecepRoutingModule { }
