import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { TeamsService } from 'src/app/services/teams.service';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
})
export class TeamsComponent implements OnInit {
  isAdmin: boolean;

  showAlert: boolean;
  alertMessage: string;
  teamsList: {
    team_name: string;
    managers: string[];
    description: string;
    status_frequency: string;
    team_short_name: string;
  }[];
  constructor(
    private teamsService: TeamsService,
    private profileService: ProfileService
  ) {
    this.isAdmin = false;

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
      this.profileService.getProfile().subscribe(
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
