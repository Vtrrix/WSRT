import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  //using reactive form for login form

  loginForm: FormGroup;
  showAlert: Boolean;
  // to control alert message visibility
  errorMessage: string;

  constructor(private authService: AuthService, private router: Router) {
    this.errorMessage = 'Incorrect Credentials';
    this.showAlert = false;
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}'
        ), // minimum 8 characters, both upper case and lower case, special character and number
      ]),
    });
  }

  ngOnInit(): void {
    this.loginForm.reset();

    this.authService.logout();
  }

  onLogin() {
    this.showAlert = false;
    this.errorMessage = 'Incorrect Credentials';

    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.authService.login(username, password).subscribe(
      (resData) => {
        if (resData.success) {
          localStorage.setItem('token', resData.data.id_token);
          localStorage.setItem('username', resData.data.username);
          this.router.navigate(['']);
          // route to home page
        } else {
          this.showAlert = true;
        }
      },
      (error) => {
        this.errorMessage = error.message;
        this.showAlert = true;
        console.log(error);
      }
    );
  }
}
