import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
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
      passwordVisible: new FormControl(false),
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
      (res) => {
        if (res.statusCode === 200) {
          localStorage.setItem('token', res.data.id_token);
          localStorage.setItem('username', res.data.username);
          this.router.navigate(['']);
          // route to home page
        } else {
          this.errorMessage = res.message;
          this.showAlert = true;
        }
      },
      (error) => {
        this.errorMessage = error.error.message;
        this.showAlert = true;
        console.log(error);
      }
    );
  }
  togglePassword() {
    let passwordInput: HTMLInputElement = <HTMLInputElement>(
      document.getElementById('loginPassword')
    );
    if (passwordInput!.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }
}
