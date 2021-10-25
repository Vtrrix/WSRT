import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Input() visible;
  // to make navbar visible if manager

  constructor(
    private authService: AuthService,
    private profileService: ProfileService
  ) {
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
    };
    this.authService.logout();
  }
}
