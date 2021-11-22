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

  remarkForm: FormGroup;

  statusID: string;
  status: status;
  constructor(
    private route: ActivatedRoute,
    private statusService: StatusService,
    private router: Router
  ) {
    this.username = null;
    this.isManager = false;
    this.teamName = '';
    this.statusID = '';

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
    });
    this.statusService.getStatus(this.statusID, this.username).subscribe(
      (res) => {
        if (<number>(<unknown>res.statusCode) === 200) {
          this.status = res.data;
          this.fillData(
            this.status.task_done,
            this.status.next_week_plans,
            this.status.concerns
          );

          this.remarkForm.controls['remark'].setValue(
            res.data.managerial_remarks
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
  }

  fillData(taskDone: string, nextWeekPlan: string, risk: string) {
    document.getElementById('taskDone')!.innerHTML = taskDone;
    document.getElementById('nextWeekPlan')!.innerHTML = nextWeekPlan;
    document.getElementById('risk')!.innerHTML = risk;
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
      this.statusService.getStatusList(1, this.username, null, true).subscribe(
        (res) => {
          console.log(res);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.statusService.getStatusList(1, this.username, null, false).subscribe(
        (res) => {
          console.log(res);
          this.router.navigate([
            '/user',
            'status',
            res.data.status_list[0].status_id,
          ]);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
