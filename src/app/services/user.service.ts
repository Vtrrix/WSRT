import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface user {
  name: string;
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userList: user[];
  constructor(private http: HttpClient) {
    this.userList = [];
  }

  getUsers() {
    return this.http.get<[user[], number]>(
      `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/users`,
      {
        headers: new HttpHeaders({
          token: `${localStorage.getItem('token')}`,
        }),
      }
    );
  }
}
