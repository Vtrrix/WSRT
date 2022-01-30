import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() columns: string[];
  @Input() data: Iterable<any>[];
  // for managerial view
  @Input() username: string | null;
  @Input() inManagerView: boolean;
  @Input() teamName: string;
  @Input() highlightRowList: boolean[];

  @Input() statusList: {
    title: string;
    concerns: string;
    status_read: boolean;
    task_done: string;
    status_id: string;
    next_week_plans: string;
    submit_time_stamp: string;
    managerial_remarks: string;
  }[];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.columns = [];
    this.highlightRowList = [];
    this.statusList = [];
    this.data = [];
    // To handle home component with manager view member

    // 1. To check if manager checking member
    this.inManagerView = false;

    // 2. If null will fetch current user data else provided user data
    this.username = null;
    //3. To use teamname in routing on specific status click
    this.teamName = '';
    // -----------------------------------------------
  }

  ngOnInit(): void {}

  onStatusClick(id: string) {
    if (this.inManagerView) {
      this.router.navigate([
        '/user',
        'manager',
        'teams',
        this.teamName,
        this.username,
        id,
      ]);
    } else {
      this.router.navigate(['/user', 'status', id]);
    }
  }
}
