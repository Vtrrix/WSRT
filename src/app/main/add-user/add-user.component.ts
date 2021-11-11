import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { team, TeamsService } from 'src/app/services/teams.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
  inviteUserForm: FormGroup;

  jobPositions: string[];
  teams: team[];
  managers: string[];

  constructor(
    private teamsService: TeamsService,
    private userService: UserService
  ) {
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

    this.jobPositions = [
      'Software Engineer',
      'Engineering Manager',
      'Test Automation Engineer',
      'Backend Developer',
      'Frontend Developer',
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
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
