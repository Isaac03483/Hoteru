import { Component, inject } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-home-page',
  templateUrl: './employee-home-page.component.html',
  styleUrls: ['./employee-home-page.component.css']
})
export class EmployeeHomePageComponent {

  constructor(private cookieService: CookieService, private router: Router) {
  }

  logout() {
    this.cookieService.delete('id');
    this.router.navigate(['/','auth'])
  }
}
