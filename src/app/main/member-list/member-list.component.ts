import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { user, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  teamShortName: string;
  memberList: user[];
  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.teamShortName = '';
    this.memberList = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.teamShortName = params.teamName;
      this.userService.getUsers(this.teamShortName).subscribe((res) => {
        console.log(res);
        this.memberList = res.data;
      });
    });
  }
}
