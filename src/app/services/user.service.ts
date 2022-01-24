import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageDataService } from '../core/services/local-storage-data.service';
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

  constructor(
    private http: HttpClient,
    private localStorageDataService: LocalStorageDataService
  ) {
    this.userList = [];
  }

  getUsers(teamShortName?: string) {
    let url = `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/users?manager_username=${this.localStorageDataService.getUsername}`;

    if (teamShortName !== 'All') {
      url = `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/users?team_short_name=${teamShortName}&manager_username=${this.localStorageDataService.getUsername}`;
    }
    if (!teamShortName) {
      url = `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/users?manager_username=${this.localStorageDataService.getUsername}`;
    }
    return this.http.get<{ data: user[]; message: string; statusCode: number }>(
      url,
      {
        headers: new HttpHeaders({
          token: `${this.localStorageDataService.getJwtToken}`,
        }),
      }
    );
  }

  inviteUser(
    username: string,
    email: string,
    job: string,
    team: string,
    manager: string
  ) {
    return this.http.post<{
      message: string;
      data: string;
      statusCode: number;
    }>(
      `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/users`,
      {
        username: username,
        team: team,
        email: email,
        job_title: job,
        manager: manager,
      },
      {
        headers: new HttpHeaders({
          token: `${this.localStorageDataService.getJwtToken}`,
        }),
      }
    );
  }
}
