import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
} from '@ng-bootstrap/ng-bootstrap';
import { SideMenuService } from 'src/app/services/side-menu.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status-list',
  templateUrl: './status-list.component.html',
  styleUrls: ['./status-list.component.css'],
})
export class StatusListComponent implements OnInit {
  // for managerial view
  @Input() username: string | null;
  @Input() inManagerView: boolean;

  nextVisible: boolean;
  prevVisible: boolean;
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
    public formatter: NgbDateParserFormatter,
    private sideMenuService: SideMenuService,
    private router: Router
  ) {
    // To handle home component with manager view member

    // 1. To check if manager checking member
    this.inManagerView = false;

    // 2. If null will fetch current user data else provided user data
    this.username = null;
    // -------------------------------------
    this.nextVisible = true;
    this.prevVisible = false;
    this.showAlert = false;
    this.alertMessage = '';
    this.pageSize = 5;
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.currentPage = 0;
    this.currentStatusList = [];
  }

  ngOnInit(): void {
    if (!this.inManagerView) {
      this.sideMenuService.changeSideMenu([
        { title: 'My Info', route: '/user' },
        { title: 'My Status', route: 'status' },
      ]);
    }

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
      ':' +
      stamp
        .slice(stamp.indexOf(':') + 1)
        .slice(0, stamp.slice(stamp.indexOf(':') + 1).indexOf(':'));

    return date + time;
  }

  // api call to get status
  fetchStatus(size: number) {
    this.statusService.getStatusList(size, this.username).subscribe(
      (res) => {
        if (!res.data.hasMorePages) {
          this.nextVisible = false;
        } else {
          this.nextVisible = true;
        }
        if (res.statusCode === 200) {
          if (res.data.status_list.length !== 0) {
            // to update current view -------------
            res.data.status_list.map((status) => {
              status.submit_time_stamp = this.convertDate(
                status.submit_time_stamp
              );
            });
            this.currentStatusList = [...res.data.status_list];
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
          } else {
            this.currentStatusList = [];
          }
        } else {
          this.alertMessage = <string>(<unknown>res.data.status_list);
          this.showAlert = true;
        }
      },
      (error) => {
        this.alertMessage = error.error.message;
        this.showAlert = true;
      }
    );
  }

  nextPage() {
    this.currentPage++;

    this.prevVisible = true;

    // status id of last element of previous page
    this.statusService.lastStatusID =
      this.statusService.fullStatusListID[this.currentPage];

    this.fetchStatus(this.pageSize);
  }
  prevPage() {
    this.currentPage--;
    this.nextVisible = true;
    if (this.currentPage === 0) {
      this.prevVisible = false;
    }
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
      const toDate = new Date(date.getFullYear(), date.getMonth(), 1);
      this.statusService.FromDate = `${toDate.getFullYear()}-${
        toDate.getMonth() + 1
      }-1`;
      this.statusService.ToDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`;
    }
    if (type === 'lastMonth') {
      const date = new Date();
      const fromDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
      const toDate = new Date(date.getFullYear(), date.getMonth(), 0);

      this.statusService.FromDate = `${fromDate.getFullYear()}-${
        fromDate.getMonth() + 1
      }-1`;
      this.statusService.ToDate = `${toDate.getFullYear()}-${
        toDate.getMonth() + 1
      }-${toDate.getDate()}`;
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

  onStatusClick(id: string) {
    this.router.navigate(['/user', 'status', id]);
  }
}
