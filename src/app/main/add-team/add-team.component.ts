import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StaticDataService } from 'src/app/services/static-data.service';
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
  selectedStatusFrequency: string;
  showAlert: boolean;
  alertMessage: string;
  // staticData----------------------
  statusFrequencyList: string[];
  weekDayList: string[];
  //---------------------------------
  selected = [{ id: 3, name: 'Volkswagen Ford' }];
  constructor(
    private teamsService: TeamsService,
    private userService: UserService,
    private router: Router,
    private staticDataService: StaticDataService
  ) {
    this.showAlert = false;
    this.alertMessage = '';
    this.managerList = [];
    this.userList = [];
    this.statusFrequencyList = [];
    this.weekDayList = [];
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
      weeklyStatusDay: new FormControl(null, Validators.required),

      managers: new FormControl(null, Validators.required),
    });
    this.selectedStatusFrequency = '';
  }

  ngOnInit(): void {
    if (
      this.staticDataService.staticData.status_frequencies.length === 0 ||
      this.staticDataService.staticData.weekly_status_days.length === 0
    ) {
      this.staticDataService.getStaticData().subscribe(
        (res) => {
          console.log(res);
          this.staticDataService.staticData = res.data;
          this.weekDayList =
            this.staticDataService.staticData.weekly_status_days;
          this.statusFrequencyList =
            this.staticDataService.staticData.status_frequencies;
        },
        (error) => {
          console.log(error);
          this.showAlert = true;
          this.alertMessage = error.error.message;
        }
      );
    } else {
      this.weekDayList = this.staticDataService.staticData.weekly_status_days;
      this.statusFrequencyList =
        this.staticDataService.staticData.status_frequencies;
    }

    this.userService.getUsers().subscribe(
      (res) => {
        this.userList = res.data;
      },
      (error) => {
        console.log(error);
        this.showAlert = true;
        this.alertMessage = error.error.message;
      }
    );
    this.addTeamForm.valueChanges.subscribe((data) => {
      console.log(data);

      this.selectedStatusFrequency = data.statusFrequency;
    });
  }
  addTeam() {
    this.teamsService
      .addTeam(
        this.addTeamForm.value.teamName,
        this.addTeamForm.value.shortName,
        this.addTeamForm.value.statusFrequency,
        this.addTeamForm.value.weeklyStatusDay,
        this.addTeamForm.value.description,
        this.managerList
      )
      .subscribe(
        (res) => {
          this.router.navigate(['/user', 'manager']);
        },
        (error) => {
          console.log(error);
          this.showAlert = true;
          this.alertMessage = error.error.message;
        }
      );
  }

  onSubmit() {
    this.addTeamForm.value.managers.map((manager: user) => {
      this.managerList.push(manager.username);
    });

    this.addTeam();
  }
}
