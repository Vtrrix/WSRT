import { Component, OnInit } from '@angular/core';
import { team, TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  jobPositions: string[];
  teams: team[];
  managers: string[];

  selectedJob: string;
  selectedTeam: team;
  selectedManager: string;

  constructor(private teamsService: TeamsService) {
    this.selectedJob = 'Select a Role';
    this.selectedManager = 'Select a Manager';
    this.selectedTeam = {
      team_name: 'Select a Team',
      managers: [],
      description: '',
      status_frequency: '',
      team_short_name: '',
    };
    this.jobPositions = [
      'SDE',
      'Manager',
      'big manager',
      'bigger manager',
      'biggest Manager',
    ];
    this.teams = [];
    this.managers = [];
  }

  ngOnInit(): void {
    this.teamsService.getTeams().subscribe(
      (res) => {
        this.teams = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onJobSelect(job: string) {
    this.selectedJob = job;
  }
  onTeamSelect(team: team) {
    this.selectedTeam = team;
  }
}
