import { Component, Input, OnInit } from '@angular/core';
import { LocalStorageDataService } from 'src/app/core/services/local-storage-data.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() visible;
  username: string | null;
  // to make navbar visible if manager

  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private localStorageDataService: LocalStorageDataService
  ) {
    this.username = this.localStorageDataService.getUsername;
    this.visible = true;
  }

  ngOnInit(): void {}
  onLogout() {
    this.profileService.setProfileData = {
      job_title: null,
      next_status_date: null,
      teams_managed: null,
      manager: null,
      team: null,
      address: null,
      email: null,
      name: null,
      phone: null,
      role: null,
      leaves_planned: null,
    };
    this.authService.logout();
  }
}
