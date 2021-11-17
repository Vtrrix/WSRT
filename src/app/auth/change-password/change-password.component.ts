import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  otpSent: boolean;
  changePasswordForm: FormGroup;
  requestOtpForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.otpSent = false;
    this.requestOtpForm = new FormGroup({
      username: new FormControl(null, Validators.required),
    });
    this.changePasswordForm = new FormGroup({
      otp: new FormControl(null, [
        Validators.required,
        Validators.pattern('.*[0-9]$'),
      ]),
      password: new FormControl(null, [
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

  ngOnInit(): void {
    this.changePasswordForm.reset();
  }
  onRequestOTP() {
    this.authService.requestOtp(this.requestOtpForm.value.username).subscribe(
      (res) => {
        console.log(res);
        this.otpSent = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onSubmit() {
    this.authService
      .changePassword(
        this.requestOtpForm.value.username,
        this.changePasswordForm.value.otp,
        this.changePasswordForm.value.password
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log(error);
        }
      );
    console.log(this.changePasswordForm);
  }
}
