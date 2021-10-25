import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface loginResponse {
  message: boolean;
  error: boolean;
  success: string;
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

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.router.navigate(['/login']);
  }
}
