import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
export interface user {
  team: string;
  latest_status_seen: boolean;
  name: string;
  phone: string;
  email: string;
  manager: string;
  username: string;
  job_title: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userList: user[];
  constructor(private http: HttpClient) {
    this.userList = [];
  }

  getUsers(teamShortName?: string) {
    console.log(teamShortName);

    let url = `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/users?manager_username=${localStorage.getItem(
      'username'
    )}`;

    if (teamShortName !== 'All') {
      url = `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/users?team_short_name=${teamShortName}&manager_username=${localStorage.getItem(
        'username'
      )}`;
    }
    if (!teamShortName) {
      url = `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/users?manager_username=${localStorage.getItem(
        'username'
      )}`;
    }
    return this.http.get<{ data: user[]; message: string; statusCode: number }>(
      url,
      {
        headers: new HttpHeaders({
          token: `${localStorage.getItem('token')}`,
        }),
      }
    );
  }
}
