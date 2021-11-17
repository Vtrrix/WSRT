import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface loginResponse {
  message: string;
  statusCode: number;
  data: {
    username: string;
    id_token: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    return this.http.post<loginResponse>(
      'https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/login',
      {
        username: username,
        password: password,
      }
    );
  }
  requestOtp(username: string) {
    return this.http.post<{
      data: string;
      message: string;
      status_code: number;
    }>(
      'https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/forgot_password',
      {
        username: username,
      }
    );
  }
  changePassword(username: string, otp: string, password: string) {
    return this.http.post<{
      data: string;
      message: string;
      status_code: number;
    }>(
      'https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/confirm_forgot_password',
      {
        username: username,
        code: otp,
        password: password,
      }
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
