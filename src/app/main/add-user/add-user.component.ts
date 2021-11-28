import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StaticDataService } from 'src/app/services/static-data.service';
import { team, TeamsService } from 'src/app/services/teams.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  @Input() closeModal: () => void;

  inviteUserForm: FormGroup;
  teams: team[];
  managers: string[];
  showAlert: boolean;
  alertMessage: string;
  // staticData----------------------
  jobPositions: string[];
  //---------------------------------

  constructor(
    private teamsService: TeamsService,
    private userService: UserService,
    private router: Router,
    private staticDataService: StaticDataService
  ) {
    this.alertMessage = '';
    this.showAlert = false;

    this.closeModal = () => {};
    this.inviteUserForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      job: new FormControl('', [Validators.required]),
      team: new FormControl('', [Validators.required]),
      manager: new FormControl('', [Validators.required]),
    });

    this.jobPositions = [];
    this.teams = [];
    this.managers = [];
  }

  ngOnInit(): void {
    if (this.staticDataService.staticData.job_titles.length === 0) {
      this.staticDataService.getStaticData().subscribe(
        (res) => {
          console.log(res);
          this.staticDataService.staticData = res.data;
          this.jobPositions = this.staticDataService.staticData.job_titles;
        },
        (error) => {
          this.showAlert = true;
          this.alertMessage = error.error.message;
          console.log(error);
        }
      );
    } else {
      this.jobPositions = this.staticDataService.staticData.job_titles;
    }

    this.teamsService.getTeams().subscribe(
      (res) => {
        this.teams = res.data;
      },
      (error) => {
        this.showAlert = true;
        this.alertMessage = error.error.message;
        console.log(error);
      }
    );
  }

  loadManagers() {
    const selectedTeam = this.teams.filter((team) => {
      return team.team_short_name === this.inviteUserForm.value.team;
    });
    if (selectedTeam.length === 0) {
      this.managers = [];
    } else {
      this.managers = selectedTeam[0].managers;
    }
  }
  onSubmit() {
    console.log(this.inviteUserForm);
    this.userService
      .inviteUser(
        this.inviteUserForm.value.username,
        this.inviteUserForm.value.email,
        this.inviteUserForm.value.job,
        this.inviteUserForm.value.team,
        this.inviteUserForm.value.manager
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/user', 'manager', 'teams', 'All']);
        },
        (error) => {
          this.showAlert = true;
          this.alertMessage = error.error.message;
          console.log(error);
        }
      );
    this.closeModal();
  }
}
