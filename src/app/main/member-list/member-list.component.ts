import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  teamShortName: string;
  constructor(private route: ActivatedRoute) {
    this.teamShortName = '';
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.teamShortName = params.teamName;
    });
  }
}
