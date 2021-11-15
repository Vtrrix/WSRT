import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-member-status',
  templateUrl: './member-status.component.html',
  styleUrls: ['./member-status.component.css'],
})
export class MemberStatusComponent implements OnInit {
  memberName: string;
  statusID: string;
  teamName: string;
  constructor(private route: ActivatedRoute) {
    this.memberName = '';
    this.statusID = '';
    this.teamName = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.memberName = params.memberName;
      this.statusID = params.statusID;
      this.teamName = params.teamName;
    });
  }
}
