import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageDataService } from '../core/services/local-storage-data.service';

interface loginResponse {
  message: string;
  statusCode: number;
  data: {
    username: string;
    id_token: string;
    access_token: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private localStorageDataService: LocalStorageDataService
  ) {}

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

  updatePassword(oldPassword: string, newPassword: string) {
    return this.http.post<{
      data: string;
      message: string;
      statusCode: number;
    }>(
      'https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/change_password',
      {
        old_password: oldPassword,
        new_password: newPassword,
      },
      {
        headers: new HttpHeaders({
          token: <string>this.localStorageDataService.getJwtToken,
          access_token: <string>this.localStorageDataService.accessToken,
        }),
      }
    );
  }
  logout() {
    this.localStorageDataService.removeData('token');
    this.localStorageDataService.removeData('username');
    this.router.navigate(['/login']);
  }
}
