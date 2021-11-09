import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileService } from './profile.service';
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
    private profileService: ProfileService
  ) {
    this.userList = [];
  }

  getUsers(teamShortName?: string) {
    let role: string = 'user';

    if (!this.profileService.getProfileData.role) {
      this.profileService.getProfile().subscribe(
        (res) => {
          role = <string>res.data.role;
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      role = this.profileService.getProfileData.role;
    }

    let url = `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/users?manager_username=${localStorage.getItem(
      'username'
    )}`;

    if (teamShortName !== 'All') {
      url = `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/users?team_short_name=${teamShortName}&manager_username=${localStorage.getItem(
        'username'
      )}`;
      if (role === 'admin') {
        url = `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/users?team_short_name=${teamShortName}`;
      }
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
