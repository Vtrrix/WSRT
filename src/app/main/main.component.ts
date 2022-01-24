import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageDataService } from '../core/services/local-storage-data.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  navbarVisible: boolean;
  // visible true if manager to show navbar navigation
  @ViewChild('wrapper') div: ElementRef | undefined;

  constructor(
    private router: Router,
    private profileService: ProfileService,
    private localStorageDataService: LocalStorageDataService
  ) {
    this.navbarVisible = false;
  }

  ngOnInit(): void {
    if (!this.localStorageDataService.getJwtToken) {
      this.router.navigate(['login']);
    }

    document
      .getElementById('menu-toggle')!
      .addEventListener('click', (event) => {
        event.preventDefault();
        this.div?.nativeElement.classList.contains('toggled')
          ? this.div?.nativeElement.classList.remove('toggled')
          : this.div?.nativeElement.classList.add('toggled');
      });

    // if full name does not exists reroute to edit profile
    if (!this.profileService.getProfile.name) {
      this.router.navigate(['/user', 'edit-profile']);
    }

    // If profile data does not exist call api else get data from service state
    if (this.profileService.getProfileData.teams_managed) {
      // to change visibility of navbar

      this.navbarVisible =
        this.profileService.getProfileData.role === 'manager' ||
        this.profileService.getProfileData.role === 'admin'
          ? true
          : false;
    } else {
      this.profileService.getProfile(null).subscribe(
        (res) => {
          if (res.statusCode === 200) {
            this.profileService.setProfileData = res.data;

            // to change visibility of navbar
            this.navbarVisible =
              this.profileService.getProfileData.role === 'manager' ||
              this.profileService.getProfileData.role === 'admin'
                ? true
                : false;
          } else {
          }
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
