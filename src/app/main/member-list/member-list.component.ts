import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  tableColumns: string[];
  tableData: string[][];

  teamsList: team[];
  memberList: user[];
  showAlert: boolean;
  alertMessage: string;
  constructor(
    private route: ActivatedRoute,
    private teamsService: TeamsService,
    private userService: UserService,
    private modalService: NgbModal,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.showAlert = false;
    this.alertMessage = '';
    this.role = null;
    this.teamShortName = '';
    this.memberList = [];
    this.teamsList = [];
    this.tableColumns = [
      'Name',
      'Job Title',
      'Team',
      'Mobile',
      'E-mail',
      'Status Notification',
    ];
    this.tableData = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.teamShortName = params.teamName;

      this.userService.getUsers(this.teamShortName).subscribe((res) => {
        this.memberList = res.data;
        this.userService.userList = this.memberList;
        this.memberList.map((member) => {
          this.tableData.push([
            member.name,
            member.job_title,
            member.team,
            member.phone,
            member.email,
            member.latest_status_seen ? 'Seen' : 'New Status',
          ]);
        });
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
        this.showAlert = true;
        this.alertMessage = error.error.message;
        console.log(error);
      }
    );

    if (this.profileService.getProfileData.role === null) {
      this.profileService.getProfile(null).subscribe(
        (res) => {
          if (res.statusCode === 200) {
            this.profileService.setProfileData = res.data;
            this.role = this.profileService.getProfileData.role;
          } else {
          }
        },
        (error) => {
          this.showAlert = true;
          this.alertMessage = error.error.message;
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
  onMemberClick(memberName: string) {
    this.router.navigate([
      'user',
      'manager',
      'teams',
      this.teamShortName,
      memberName,
    ]);
  }
}
