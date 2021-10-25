import { Component, OnInit } from '@angular/core';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css'],
})
export class StatusListComponent implements OnInit {
  showAlert: boolean;
  alertMessage: string;
  public isCollapsed = true;
  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  currentPage: number;

  pageSize: number;

  // represents the status list present on the view with the number of elements always less than or equal to page size
  currentStatusList: {
    title: string;
    concerns: string;
    status_read: boolean;
    task_done: string;
    status_id: string;
    next_week_plans: string;
    submit_time_stamp: string;
    managerial_remarks: string;
  }[];

  constructor(
    private statusService: StatusService,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter
  ) {
    this.showAlert = false;
    this.alertMessage = '';
    this.pageSize = 5;
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.currentPage = 0;
    this.currentStatusList = [];
  }

  ngOnInit(): void {
    this.statusService.lastStatusID = '-1';
    this.fetchStatus(this.pageSize);
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.statusService.lastStatusID = '-1';
    this.statusService.fullStatusListID = ['-1'];
    this.fetchStatus(this.pageSize);
  }

  convertDate(stamp: string): string {
    const date = stamp
      .slice(0, stamp.indexOf(' '))
      .split('-')
      .reverse()
      .join('/');
    const time =
      stamp.slice(stamp.indexOf(' '), stamp.indexOf(':')) +
      stamp
        .slice(stamp.indexOf(':') + 1)
        .slice(
          stamp.slice(stamp.indexOf(':') + 1).indexOf(':'),
          stamp.slice(stamp.indexOf(':') + 1).indexOf('.')
        );
    return date + time;
  }

  // api call to get status
  fetchStatus(size: number) {
    this.statusService.getStatusList(size).subscribe(
      (statusList) => {
        if (statusList[1] === 200) {
          if (statusList[0].length !== 0) {
            // to update current view -------------
            statusList[0].map((status) => {
              status.submit_time_stamp = this.convertDate(
                status.submit_time_stamp
              );
            });
            this.currentStatusList = [...statusList[0]];
            //-----------------------------------

            // to update fullStatusListID if needed------------------
            if (
              !this.statusService.fullStatusListID.includes(
                this.currentStatusList[this.currentStatusList.length - 1]
                  .status_id
              )
            ) {
              this.statusService.fullStatusListID.push(
                this.currentStatusList[this.currentStatusList.length - 1]
                  .status_id
              );
            }
            //----------------------------------------------------
          }
        } else {
          this.alertMessage = <string>(<unknown>statusList[0]);
          this.showAlert = true;
        }
      },
      (error) => {
        this.alertMessage = error.message;
        this.showAlert = true;
      }
    );
  }

  nextPage() {
    this.currentPage++;

    // status id of last element of previous page
    this.statusService.lastStatusID =
      this.statusService.fullStatusListID[this.currentPage];
    console.log(this.statusService.fullStatusListID);

    this.fetchStatus(this.pageSize);
  }
  prevPage() {
    this.currentPage--;
    // status id of last element of previous to previous page
    this.statusService.lastStatusID =
      this.statusService.fullStatusListID[this.currentPage];
    this.fetchStatus(this.pageSize);
  }

  filterStatus(type: 'default' | 'thisMonth' | 'lastMonth' | 'custom') {
    this.statusService.lastStatusID = '-1';
    this.statusService.fullStatusListID = ['-1'];

    if (type === 'default') {
      this.statusService.FromDate = null;
      this.statusService.ToDate = null;
    }
    if (type === 'thisMonth') {
      const date = new Date();

      this.statusService.FromDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
      this.statusService.ToDate = `${date.getFullYear()}-${date.getMonth()}-1`;
    }
    if (type === 'lastMonth') {
      const date = new Date();

      if (date.getMonth() == 1) {
        this.statusService.FromDate = `${
          date.getFullYear() - 1
        }/12/${date.getDay()}`;
        this.statusService.ToDate = `${date.getFullYear() - 1}-12-1`;
      } else {
        this.statusService.FromDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
        this.statusService.ToDate = `${date.getFullYear()}-${date.getMonth()}-1`;
      }
    }
    if (type === 'custom') {
      this.statusService.FromDate = `${this.fromDate?.year}-${this.fromDate?.month}-${this.fromDate?.day}`;
      this.statusService.ToDate = `${this.toDate?.year}-${this.toDate?.month}-${this.toDate?.day}`;
    }

    this.fetchStatus(this.pageSize);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (
      this.fromDate &&
      !this.toDate &&
      date &&
      date.after(this.fromDate)
    ) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return (
      this.fromDate &&
      !this.toDate &&
      this.hoveredDate &&
      date.after(this.fromDate) &&
      date.before(this.hoveredDate)
    );
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return (
      date.equals(this.fromDate) ||
      (this.toDate && date.equals(this.toDate)) ||
      this.isInside(date) ||
      this.isHovered(date)
    );
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed))
      ? NgbDate.from(parsed)
      : currentValue;
  }
}
