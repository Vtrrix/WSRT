import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import { team, TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  isAdmin: boolean;

  tableColumns: string[];
  tableData: string[][];

  showAlert: boolean;
  alertMessage: string;
  teamsList: team[];
  constructor(
    private teamsService: TeamsService,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.isAdmin = false;
    this.tableColumns = [
      'Name',
      'Short Name',
      'Status Frequency',
      'Description',
      'Manager',
    ];
    this.tableData = [];
    this.showAlert = false;
    this.alertMessage = '';
    this.teamsList = [];
  }

  ngOnInit(): void {
    this.getTeams();
    // If profile data does not exist call api else get data from service state
    if (this.profileService.getProfileData.teams_managed) {
      // to change visibility of navbar
      this.isAdmin =
        this.profileService.getProfileData.role === 'admin' ? true : false;
    } else {
      this.profileService.getProfile(null).subscribe(
        (res) => {
          if (res.statusCode === 200) {
            this.profileService.setProfileData = res.data;

            // to change visibility of navbar
            this.isAdmin =
              this.profileService.getProfileData.role === 'admin'
                ? true
                : false;
          } else {
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
  onTeamClick(teamName: string) {
    this.router.navigate(['/user', 'manager', 'teams', teamName]);
  }

  getTeams() {
    this.teamsService.getTeams().subscribe(
      (res) => {
        if (res.statusCode === 200) {
          this.teamsList = res.data;

          // for status frequency weekly display week day too
          this.teamsList.map((team) => {
            let teamManagers = '';
            team.managers.map((manager) => {
              teamManagers += manager + '\n';
            });

            this.tableData.push([
              team.team_name,
              team.team_short_name,
              team.status_frequency,
              team.description,
              teamManagers,
            ]);
          });

          console.log(this.tableData);
        } else {
          this.showAlert = true;
          this.alertMessage = res.message;
        }
      },
      (error) => {
        this.showAlert = true;
        this.alertMessage = error.error.message;
      }
    );
  }
}
