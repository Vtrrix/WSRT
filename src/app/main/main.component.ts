import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  navbarVisible: boolean;
  // visible true if manager to show navbar navigation
  breadcrumb: { title: string; route: string }[];

  constructor(private router: Router, private profileService: ProfileService) {
    this.breadcrumb = [
      {
        title: 'Home',
        route: '',
      },
      {
        title: 'Status',
        route: '',
      },
    ];
    this.navbarVisible = false;
  }

  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      this.router.navigate(['login']);
    }

    document
      .getElementById('menu-toggle')!
      .addEventListener('click', (event) => {
        event.preventDefault();
        document.getElementById('wrapper')!.classList.contains('toggled')
          ? document.getElementById('wrapper')!.classList.remove('toggled')
          : document.getElementById('wrapper')!.classList.add('toggled');
      });

    // If profile data does not exist call api else get data from service state
    if (this.profileService.getProfileData.teams_managed) {
      // to change visibility of navbar

      this.navbarVisible =
        this.profileService.getProfileData.role === 'manager' ||
        this.profileService.getProfileData.role === 'admin'
          ? true
          : false;
    } else {
      this.profileService.getProfile().subscribe(
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
