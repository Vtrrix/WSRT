import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageDataService } from '../core/services/local-storage-data.service';

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
  role: string | null;
  leaves_planned: string[] | null;
}
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  //replace type here with model type
  profileData: userProfile;

  constructor(
    private http: HttpClient,
    private localStorageDataService: LocalStorageDataService
  ) {
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
      role: null,
      leaves_planned: null,
    };
  }

  public get getProfileData() {
    return this.profileData;
  }
  public set setProfileData(data: userProfile) {
    this.profileData = data;
  }

  getProfile(username: string | null) {
    let url = `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/users/${username}`;
    if (!username) {
      url = `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/users/${this.localStorageDataService.getUsername}`;
    }
    return this.http.get<{
      data: userProfile;
      message: string;
      statusCode: number;
    }>(url, {
      headers: new HttpHeaders(),
    });
  }

  updateProfile(name: string, address: string, phone: string) {
    return this.http.put<{ data: string; statusCode: number }>(
      `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/users/${this.localStorageDataService.getUsername}`,

      {
        name: name,
        address: address,
        phone: phone,
      },
      {
        headers: new HttpHeaders(),
      }
    );
  }
}
