import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface userProfile {
  job_title: string | null;
  next_status_date: string | null;
  teams_managed: string[] | null;
  manager: string | null;
  team: string | null;
  address: string | null;
  email: string | null;
  name: string | null;
  phone: string | null;
}
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  //replace type here with model type
  profileData: userProfile;

  constructor(private http: HttpClient) {
    this.profileData = {
      job_title: null,
      next_status_date: null,
      teams_managed: null,
      manager: null,
      team: null,
      address: null,
      email: null,
      name: null,
      phone: null,
    };
  }

  public get getProfileData() {
    return this.profileData;
  }
  public set setProfileData(data: userProfile) {
    this.profileData = data;
  }

  getProfile() {
    return this.http.get<[userProfile, number]>(
      `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/users/${localStorage.getItem(
        'username'
      )}`,
      {
        headers: new HttpHeaders({
          token: `${localStorage.getItem('token')}`,
        }),
      }
    );
  }

  updateProfile(name: string, address: string, phone: string) {
    return this.http.put<[string, number]>(
      `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/users/${localStorage.getItem(
        'username'
      )}`,

      {
        name: name,
        address: address,
        phone: phone,
      },
      {
        headers: new HttpHeaders({
          token: `${localStorage.getItem('token')}`,
        }),
      }
    );
  }
}
