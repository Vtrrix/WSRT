import { Component, Input, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { SideMenuService } from 'src/app/services/side-menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  showAlert: boolean;
  alertMessage: string;
  profileData;
  // feilds: string[];
  // values: (string | string[])[];

  constructor(
    private profileService: ProfileService,
    private sideMenuService: SideMenuService
  ) {
    this.showAlert = false;
    this.alertMessage = '';
    this.profileData = profileService.profileData;
    // this.feilds = [];
    // this.values = [];
  }

  ngOnInit(): void {
    this.sideMenuService.changeSideMenu([
      { title: 'My Info', route: '/' },
      { title: 'My Status', route: 'status' },
    ]);

    this.profileService.getProfile().subscribe(
      (data) => {
        if (data[1] === 200) {
          this.profileService.setProfileData = data[0];
          this.profileData = data[0];
          // this.feilds = Object.keys(data[0]);
          // this.values = Object.values(data[0]);
          // console.log(this.feilds, this.values);
        } else {
          this.showAlert = true;
          this.alertMessage = <string>(<unknown>data[0]);
        }
      },
      (error) => {
        this.showAlert = true;
        this.alertMessage = error.message;
      }
    );
  }
}
