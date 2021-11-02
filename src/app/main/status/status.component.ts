import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { status, StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent implements OnInit {
  statusID: string;
  status: status;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private statusService: StatusService
  ) {
    this.statusID = '';
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
    console.log(this.route.snapshot.params.statusID);
    this.route.params.subscribe((params: Params) => {
      this.statusID = params.statusID;
    });
    this.statusService.getStatus(this.statusID).subscribe(
      (res) => {
        console.log(res);
        if (<number>(<unknown>res[1]) === 200) {
          this.status = res[0];
          this.fillData(
            this.status.task_done,
            this.status.next_week_plans,
            this.status.concerns
          );
          console.log(this.status);
        } else {
          console.log(res[0]);
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
}
