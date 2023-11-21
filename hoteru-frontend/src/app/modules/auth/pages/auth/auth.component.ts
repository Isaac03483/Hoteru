import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Employee} from "../../../../core/models/Employee";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  hide: boolean = true;
  authForm: FormGroup;

  constructor(private builder: FormBuilder, private authService: AuthService,
              private snackBar: MatSnackBar, private router: Router, private cookieService: CookieService) {
    this.authForm = this.builder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  validate() {
    const { username, password } = this.authForm.value;

    this.authService.validate(username, password)
      .subscribe({
        next: (response: Employee) => {

          this.cookieService.set('id', `${response.id}`);
          if(response.type === 'admin') {
            this.router.navigate(['/','admin']);
            return;
          }

          if(response.type === 'recepcionista') {
            this.router.navigate(['/','receptionist'])
            return;
          }

          this.router.navigate(['/', 'employee'])
        },

        error: err => {
          console.log(err)
          this.snackBar.open("No se encontró al usuario", "Cerrar");
        }
      });
  }
}
