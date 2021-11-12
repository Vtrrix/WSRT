import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface team {
  team_name: string;
  managers: string[];
  description: string;
  status_frequency: string;
  weekly_status_day: string;
  team_short_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class TeamsService {
  teamsList: team[];
  constructor(private http: HttpClient) {
    this.teamsList = [];
  }

  getTeams() {
    return this.http.get<{
      data: team[];
      message: string;
      statusCode: number;
    }>(
      `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/teams?username=${localStorage.getItem(
        'username'
      )}`,
      {
        headers: new HttpHeaders({
          token: `${localStorage.getItem('token')}`,
        }),
      }
    );
  }
  addTeam(
    teamName: string,
    shortName: string,
    frequency: 'weekly' | 'daily',
    weeklyStatusDay: string,
    description: string,
    managers: string[]
  ) {
    return this.http.post(
      `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/teams`,
      {
        team_name: teamName,
        team_short_name: shortName,
        status_frequency: frequency,
        weekly_status_day: weeklyStatusDay,
        description: description,
        managers: managers,
      },
      {
        headers: new HttpHeaders({
          token: `${localStorage.getItem('token')}`,
        }),
      }
    );
  }
}
