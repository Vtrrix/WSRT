import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { status, StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent implements OnInit {
  @Input() username: string | null;
  @Input() isManager: boolean;
  @Input() teamName: string;

  remarks: string | null;

  nextStatusID: string;
  prevStatusID: string;

  remarkForm: FormGroup;

  statusID: string;
  status: status;
  constructor(
    private route: ActivatedRoute,
    private statusService: StatusService,
    private router: Router
  ) {
    this.remarks = null;
    this.username = null;
    this.isManager = false;
    this.teamName = '';
    this.statusID = '';
    this.nextStatusID = '';
    this.prevStatusID = '';
    this.remarkForm = new FormGroup({
      remark: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(150),
      ]),
    });
    this.status = {
      title: '',
      concerns: '',
      status_read: false,
      task_done: '',
      status_id: '',
      next_week_plans: '',
      submit_time_stamp: '',
      managerial_remarks: '',
    };
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.statusID = params.statusID;

      this.statusService.getStatus(this.statusID, this.username).subscribe(
        (res) => {
          if (<number>(<unknown>res.statusCode) === 200) {
            this.status = res.data;
            console.log(res);

            // to change time stamp if needed
            // this.status.submit_time_stamp = this.convertDate(
            //   this.status.submit_time_stamp
            // );

            this.fillData(
              this.status.task_done,
              this.status.next_week_plans,
              this.status.concerns,
              this.status.managerial_remarks
            );

            // to post status as read by manager to API
            if (this.username && !res.data.status_read) {
              this.statusService
                .addRemark(
                  this.remarkForm.value.remark,
                  this.username,
                  this.statusID
                )
                .subscribe((res) => {
                  console.log(res);
                });
            }
          } else {
            console.log(res.meassage);
          }
        },
        (error) => {
          console.log(error);
        }
      );
      this.loadNextAndPrevStatusID();
    });
  }

  fillData(
    taskDone: string,
    nextWeekPlan: string,
    risk: string,
    managerialRemarks: string
  ) {
    document.getElementById('taskDone')!.innerHTML = taskDone;
    document.getElementById('nextWeekPlan')!.innerHTML = nextWeekPlan;
    document.getElementById('risk')!.innerHTML = risk;
    this.remarks = managerialRemarks;
  }
  // convertDate(stamp: string): string {
  //   const date = stamp
  //     .slice(0, stamp.indexOf(' '))
  //     .split('-')
  //     .reverse()
  //     .join('/');
  //   const time =
  //     stamp.slice(stamp.indexOf(' '), stamp.indexOf(':')) +
  //     ':' +
  //     stamp
  //       .slice(stamp.indexOf(':') + 1)
  //       .slice(0, stamp.slice(stamp.indexOf(':') + 1).indexOf(':'));

  //   return date + time;
  // }

  loadNextAndPrevStatusID() {
    let tempStatusID = this.statusService.lastStatusID;
    this.statusService.lastStatusID = this.statusID;
    this.statusService.getStatusList(1, this.username, null, true).subscribe(
      (res) => {
        if (res.data.status_list.length) {
          this.statusService.lastStatusID = tempStatusID;
          this.nextStatusID = res.data.status_list[0].status_id;
        } else {
          this.nextStatusID = '';
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.statusService.getStatusList(1, this.username, null, false).subscribe(
      (res) => {
        if (res.data.status_list.length) {
          this.statusService.lastStatusID = tempStatusID;
          this.prevStatusID = res.data.status_list[0].status_id;
          console.log(this.prevStatusID);
        } else {
          this.prevStatusID = '';
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onSubmit() {
    if (this.username) {
      this.statusService
        .addRemark(this.remarkForm.value.remark, this.username, this.statusID)
        .subscribe(
          (res) => {
            console.log(res);
            this.router.navigate([
              '/user',
              'manager',
              'teams',
              this.teamName,
              this.username,
            ]);
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
  navigateStatus(direction: 'next' | 'prev') {
    if (direction === 'next') {
      if (this.isManager) {
        this.router.navigate([
          '/user',
          'manager',
          'teams',
          this.teamName,
          this.username,
          this.nextStatusID,
        ]);
      } else {
        this.router.navigate(['/user', 'status', this.nextStatusID]);
      }
    } else {
      if (this.isManager) {
        this.router.navigate([
          '/user',
          'manager',
          'teams',
          this.teamName,
          this.username,
          this.prevStatusID,
        ]);
      } else {
        this.router.navigate(['/user', 'status', this.prevStatusID]);
      }
    }
  }
  closeStatus() {
    if (this.isManager) {
      this.router.navigate([
        '/user',
        'manager',
        'teams',
        this.teamName,
        this.username,
      ]);
    } else {
      this.router.navigate(['/user', 'status']);
    }
  }
}
