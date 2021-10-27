import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface team {
  team_name: string;
  managers: string[];
  description: string;
  status_frequency: string;
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
  addTeam() {
    return this.http.post(
      `https://pa4favllgg.execute-api.ap-south-1.amazonaws.com/prod/teams`,
      {
        team_name: 'Test Team X',
        team_short_name: 'TestTeamX',
        status_frequency: 'weekly',
        description: 'This is Test Team X',
        managers: ['vtx2'],
      },
      {
        headers: new HttpHeaders({
          token: `${localStorage.getItem('token')}`,
        }),
      }
    );
  }
}
