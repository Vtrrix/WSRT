import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { user, UserService } from 'src/app/services/user.service';
import { team, TeamsService } from 'src/app/services/teams.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  role: string | null;
  teamShortName: string;
  teamsList: team[];
  memberList: user[];
  constructor(
    private route: ActivatedRoute,
    private teamsService: TeamsService,
    private userService: UserService,
    private modalService: NgbModal,
    private profileService: ProfileService
  ) {
    this.role = null;
    this.teamShortName = '';
    this.memberList = [];
    this.teamsList = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.teamShortName = params.teamName;
      this.userService.getUsers(this.teamShortName).subscribe((res) => {
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

    if (this.profileService.getProfileData.role === null) {
      this.profileService.getProfile().subscribe(
        (res) => {
          if (res.statusCode === 200) {
            this.profileService.setProfileData = res.data;
            this.role = this.profileService.getProfileData.role;
          } else {
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.role = this.profileService.getProfileData.role;
    }
  }
  openModal(content: any) {
    this.modalService.open(content, { centered: true, size: 'lg' });
  }
}
