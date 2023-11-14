import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Employee} from "../../../../core/models/Employee";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {

  hide: boolean = true;
  authForm: FormGroup;

  constructor(private builder: FormBuilder, private authService: AuthService,
              private snackBar: MatSnackBar, private router: Router) {
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

          if(response.type === 'admin') {
            this.router.navigate(['/','admin']);
          }
        },

        error: err => {
          console.log(err)
          this.snackBar.open("No se encontró al usuario", "cerrar",
            {duration: 1500});
        }
      });
  }
}
