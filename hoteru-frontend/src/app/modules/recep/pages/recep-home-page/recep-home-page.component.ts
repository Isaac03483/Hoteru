import { Component, inject } from '@angular/core';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-recep-home-page',
  templateUrl: './recep-home-page.component.html',
  styleUrls: ['./recep-home-page.component.css']
})
export class RecepHomePageComponent {

  constructor(private cookieService: CookieService, private router: Router) {
  }

  logout() {
    this.cookieService.delete('id');
    this.router.navigate(['/','auth'])
  }
}
