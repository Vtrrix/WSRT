import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { user, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css'],
})
export class MemberDetailsComponent implements OnInit {
  memberSelected: boolean;
  memberName: string;
  teamName: string;
  memberList: user[];
  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.memberName = '';
    this.teamName = '';
    this.memberList = [];
    this.memberSelected = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.memberName = params.memberName;
      this.teamName = params.teamName;
      this.memberSelected = this.memberName === 'none' ? false : true;
    });

    this.userService.getUsers().subscribe(
      (res) => {
        this.userService.userList = res.data;
        this.memberList = res.data;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
