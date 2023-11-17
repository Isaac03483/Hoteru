import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecepRoutingModule } from './recep-routing.module';
import { RecepHomePageComponent } from './pages/recep-home-page/recep-home-page.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatToolbarModule} from "@angular/material/toolbar";


@NgModule({
  declarations: [
    RecepHomePageComponent
  ],
  imports: [
    CommonModule,
    RecepRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ]
})
export class RecepModule { }
