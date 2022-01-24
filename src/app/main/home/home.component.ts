import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LocalStorageDataService } from 'src/app/core/services/local-storage-data.service';
import { ProfileService } from 'src/app/services/profile.service';
import { SideMenuService } from 'src/app/services/side-menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username: string | null;
  @Input() inManagerView: boolean;
  showAlert: boolean;
  alertMessage: string;
  profileData;
  // feilds: string[];
  // values: (string | string[])[];

  constructor(
    private profileService: ProfileService,
    private sideMenuService: SideMenuService,
    private router: Router,
    private route: ActivatedRoute,
    private localStorageDataService: LocalStorageDataService
  ) {
    // To handle home component with manager view member

    // 1. To check if manager checking member
    this.inManagerView = false;

    // 2. If null will fetch current user data else provided user data
    this.username = null;
    // -------------------------------------

    this.showAlert = false;
    this.alertMessage = '';
    this.profileData = profileService.profileData;
    // this.feilds = [];
    // this.values = [];
  }

  ngOnInit(): void {
    if (!this.inManagerView) {
      this.sideMenuService.changeSideMenu([
        { title: 'My Info', route: '/user' },
        { title: 'My Status', route: 'status' },
      ]);
    }
    this.route.params.subscribe((params: Params) => {
      this.username = params.memberName;
      if (this.username !== 'none') {
        this.profileService.getProfile(this.username).subscribe(
          (res) => {
            if (res.statusCode === 200) {
              this.profileService.setProfileData = res.data;
              this.profileData = res.data;
              // this.feilds = Object.keys(data[0]);
              // this.values = Object.values(data[0]);
              // console.log(this.feilds, this.values);
            } else {
              this.showAlert = true;
              this.alertMessage = <string>(<unknown>res.message);
              this.localStorageDataService;
              this.localStorageDataService.removeData('username');
              this.localStorageDataService.removeData('token');
              this.localStorageDataService.removeData('accessToken');
              this.router.navigate(['/login']);
            }
          },
          (error) => {
            this.showAlert = true;
            this.alertMessage = error.error.message;
            this.localStorageDataService.removeData('username');
            this.localStorageDataService.removeData('token');
            this.localStorageDataService.removeData('accessToken');
            this.router.navigate(['/login']);
          }
        );
      }
    });
  }
}
