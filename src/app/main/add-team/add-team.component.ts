import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TeamsService } from 'src/app/services/teams.service';
import { user, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css'],
})
export class AddTeamComponent implements OnInit {
  userList: user[];
  addTeamForm: FormGroup;
  managerList: string[];

  selected = [{ id: 3, name: 'Volkswagen Ford' }];
  constructor(
    private teamsService: TeamsService,
    private userService: UserService,
    private router: Router
  ) {
    this.managerList = [];
    this.userList = [];
    this.addTeamForm = new FormGroup({
      teamName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      shortName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(60),
      ]),
      statusFrequency: new FormControl(null, Validators.required),
      managers: new FormControl(null, Validators.required),
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (res) => {
        console.log(res);

        this.userList = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  addTeam() {
    this.teamsService
      .addTeam(
        this.addTeamForm.value.teamName,
        this.addTeamForm.value.shortName,
        this.addTeamForm.value.statusFrequency,
        this.addTeamForm.value.description,
        this.managerList
      )
      .subscribe(
        (res) => {
          console.log(res);
          this.router.navigate(['/user', 'manager']);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  onSubmit() {
    console.log(this.addTeamForm);
    this.addTeamForm.value.managers.map((manager: user) => {
      this.managerList.push(manager.username);
    });
    console.log(this.managerList);

    this.addTeam();
  }
}
