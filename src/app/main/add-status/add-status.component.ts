import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Editor, toHTML, Toolbar } from 'ngx-editor';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-add-status',
  templateUrl: './add-status.component.html',
  styleUrls: ['./add-status.component.css'],
})
export class AddStatusComponent implements OnInit, OnDestroy {
  showAlert: boolean;
  alertMessage: string;
  // timeStamp: string;
  statusID: string = '';
  currentdate = new Date();
  statusNumber: string = '0001';
  leaveID: number;
  //using reactive form for add Status form

  addStatusForm: FormGroup;
  editor1: Editor;
  editor2: Editor;
  editor3: Editor;
  toolbar: Toolbar;

  constructor(private statusService: StatusService, private router: Router) {
    this.showAlert = false;
    this.alertMessage = '';

    this.leaveID = 0;
    const currentdate = new Date();

    // this.timeStamp = currentdate.toLocaleString();

    this.editor1 = new Editor();
    this.editor2 = new Editor();
    this.editor3 = new Editor();

    this.toolbar = [
      ['bold', 'italic'],
      ['underline', 'strike'],
      ['code', 'blockquote'],
      ['ordered_list', 'bullet_list'],
      [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
      ['link', 'image'],
      ['text_color', 'background_color'],
      ['align_left', 'align_center', 'align_right', 'align_justify'],
    ];
    this.addStatusForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30),
      ]),
      taskDone: new FormControl(null, Validators.required),
      risk: new FormControl(null),
      nextWeekPlan: new FormControl(null),
      leaves: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.calculateStatusID();
    this.addLeave();
  }
  ngOnDestroy(): void {
    this.editor1.destroy();
    this.editor2.destroy();
    this.editor3.destroy();
  }
  getWeek(dowOffset: number | Date) {
    dowOffset = typeof dowOffset == 'number' ? dowOffset : 0; //default dowOffset to zero
    var newYear = new Date(this.currentdate.getFullYear(), 0, 1);
    var day = newYear.getDay() - dowOffset; //the day of week the year begins on
    day = day >= 0 ? day : day + 7;
    var daynum =
      Math.floor(
        (this.currentdate.getTime() -
          newYear.getTime() -
          (this.currentdate.getTimezoneOffset() - newYear.getTimezoneOffset()) *
            60000) /
          86400000
      ) + 1;
    var weeknum;
    //if the year starts before the middle of a week
    if (day < 4) {
      weeknum = Math.floor((daynum + day - 1) / 7) + 1;
      if (weeknum > 52) {
        const nYear = new Date(this.currentdate.getFullYear() + 1, 0, 1);
        day = nYear.getDay() - dowOffset;
        day = day >= 0 ? day : day + 7;
        /*if the next year starts before the middle of
                  the week, it is week #1 of that year*/
        weeknum = day < 4 ? 1 : 53;
      }
    } else {
      weeknum = Math.floor((daynum + day - 1) / 7);
    }
    return weeknum;
  }

  calculateStatusID() {
    const tempLastStatusID = this.statusService.lastStatusID;

    let lastStatusWeek;
    this.statusService.lastStatusID = this.statusService.fullStatusListID[0];
    this.statusService
      .getStatusList(1, null, null, true)
      .subscribe((status) => {
        if (status.data.status_list.length === 0) {
          this.statusID =
            this.currentdate.getFullYear() +
            '-' +
            this.currentdate
              .toLocaleString('default', { month: 'short' })
              .toUpperCase() +
            '-WK' +
            this.getWeek(this.currentdate) +
            '-0001';
        } else {
          lastStatusWeek = status.data.status_list[0].status_id.slice(
            status.data.status_list[0].status_id.indexOf('K') + 1
          );
          lastStatusWeek = lastStatusWeek.slice(0, lastStatusWeek.indexOf('-'));

          if (lastStatusWeek == this.getWeek(this.currentdate).toString()) {
            let newStatusNumber =
              parseInt(
                status.data.status_list[0].status_id.slice(
                  status.data.status_list[0].status_id.lastIndexOf('-') + 1
                )
              ) + 1;

            this.statusNumber = newStatusNumber.toString();

            this.statusNumber = this.statusNumber.padStart(4, '0');

            // update status ID
            this.statusID =
              this.currentdate.getFullYear() +
              '-' +
              this.currentdate
                .toLocaleString('default', { month: 'short' })
                .toUpperCase() +
              '-WK' +
              this.getWeek(this.currentdate) +
              '-' +
              this.statusNumber;
          } else {
            let newStatusNumber = 1;

            this.statusNumber = newStatusNumber.toString();

            this.statusNumber = this.statusNumber.padStart(4, '0');

            // update status ID
            this.statusID =
              this.currentdate.getFullYear() +
              '-' +
              this.currentdate
                .toLocaleString('default', { month: 'short' })
                .toUpperCase() +
              '-WK' +
              this.getWeek(this.currentdate) +
              '-' +
              this.statusNumber;
          }
        }

        this.statusService.lastStatusID = tempLastStatusID;
      });
  }

  getControls() {
    return (this.addStatusForm.get('leaves') as FormArray).controls;
  }
  // to add leave input elements to form
  addLeave() {
    (<FormArray>this.addStatusForm.get('leaves')).push(new FormControl(null));
  }
  onSubmit() {
    this.statusService
      .addStatus(
        this.statusID,
        this.addStatusForm.value.title,
        'submitted',
        this.addStatusForm.value.taskDone
          ? toHTML(this.addStatusForm.value.taskDone)
          : '',
        this.addStatusForm.value.nextWeekPlan
          ? toHTML(this.addStatusForm.value.nextWeekPlan)
          : '',
        this.addStatusForm.value.risk
          ? toHTML(this.addStatusForm.value.risk)
          : '',
        this.addStatusForm.value.leaves
      )
      .subscribe(
        (res) => {
          if (res.statusCode === 201) {
            this.router.navigate(['/user', 'status']);
          } else {
            this.alertMessage = res.message;
            this.showAlert = true;
          }
        },
        (error) => {
          this.alertMessage = error.error.message;
          this.showAlert = true;
        }
      );
    this.statusService.fullStatusListID = ['-1'];
  }
}
