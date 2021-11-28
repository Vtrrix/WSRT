import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css'],
})
export class UpdatePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  showAlert: boolean;
  alertMessage: string;
  constructor(private authService: AuthService, private router: Router) {
    this.showAlert = false;
    this.alertMessage = '';
    this.changePasswordForm = new FormGroup({
      oldPassword: new FormControl(null, [
        Validators.required,

        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}'
        ), // minimum 8 characters, both upper case and lower case, special character and number
      ]),
      newPassword: new FormControl(null, [
        Validators.required,

        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}'
        ), // minimum 8 characters, both upper case and lower case, special character and number
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern(
          '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}'
        ), // minimum 8 characters, both upper case and lower case, special character and number
      ]),
    });
  }

  ngOnInit(): void {}
  onSubmit() {
    console.log(this.changePasswordForm);
    this.authService
      .updatePassword(
        this.changePasswordForm.value.oldPassword,
        this.changePasswordForm.value.newPassword
      )
      .subscribe(
        (res) => {
          if (res.status_code === 201) {
            this.router.navigate(['/user']);
          } else {
            this.showAlert = true;
            this.alertMessage = res.message;
          }
        },
        (error) => {
          console.log(error);

          this.showAlert = true;
          this.alertMessage = error.error.message;
        }
      );
  }
}
