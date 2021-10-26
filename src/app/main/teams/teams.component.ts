import { Component, OnInit } from '@angular/core';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  showAlert: boolean;
  alertMessage: string;
  teamsList: {
    team_name: string;
    managers: string[];
    description: string;
    status_frequency: string;
    team_short_name: string;
  }[];
  constructor(private teamsService: TeamsService) {
    this.showAlert = false;
    this.alertMessage = '';
    this.teamsList = [];
  }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams() {
    this.teamsService.getTeams().subscribe(
      (res) => {
        if (res.statusCode === 200) {
          this.teamsList = res.data;
        } else {
          this.showAlert = true;
          this.alertMessage = res.message;
        }
      },
      (error) => {
        this.showAlert = true;
        this.alertMessage = error.message;
      }
    );
  }
}
