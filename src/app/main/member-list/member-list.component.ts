import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { user, UserService } from 'src/app/services/user.service';
import { team, TeamsService } from 'src/app/services/teams.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  teamShortName: string;
  teamsList: team[];
  memberList: user[];
  constructor(
    private route: ActivatedRoute,
    private teamsService: TeamsService,
    private userService: UserService,
    private modalService: NgbModal
  ) {
    this.teamShortName = '';
    this.memberList = [];
    this.teamsList = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.teamShortName = params.teamName;
      this.userService.getUsers(this.teamShortName).subscribe((res) => {
        console.log(res);
        this.memberList = res.data;
      });
    });
    this.teamsService.getTeams().subscribe(
      (res) => {
        if (res.statusCode === 200) {
          this.teamsList = res.data;
        } else {
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  openModal(content: any) {
    console.log(content);

    this.modalService.open(content, { centered: true, size: 'lg' });
  }
}
