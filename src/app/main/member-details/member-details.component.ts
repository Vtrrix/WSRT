import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
})
export class MemberDetailsComponent implements OnInit {
  memberName: string;
  teamName: string;
  constructor(private route: ActivatedRoute) {
    this.memberName = '';
    this.teamName = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.memberName = params.memberName;
      this.teamName = params.teamName;
    });
  }
}
