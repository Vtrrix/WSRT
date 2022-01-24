import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageDataService } from 'src/app/core/services/local-storage-data.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {
  showAlert: boolean;
  alertMessage: string;
  //using reactive form for edit profile form

  editProfileForm: FormGroup;
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private localStorageDataService: LocalStorageDataService
  ) {
    this.alertMessage = '';
    this.showAlert = false;
    this.editProfileForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      middleName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      phone: new FormControl(null, [
        Validators.required,
        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      address: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(40),
      ]),
    });
  }

  ngOnInit(): void {
    this.editProfileForm.reset();
    this.profileService
      .getProfile(this.localStorageDataService.getUsername)
      .subscribe(
        (res) => {
          let name = [''];
          name = res.data.name ? res.data.name?.split(' ') : [''];
          let middleName = [''];

          if (name.length > 2) {
            middleName = res.data.name ? res.data.name?.split(' ') : [''];
            middleName.pop();
            middleName.shift();
          }

          this.editProfileForm.setValue({
            firstName: name[0],
            lastName: name[name.length - 1],
            middleName: middleName?.join(' '),
            phone: res.data.phone,
            address: res.data.address,
          });
        },
        (error) => {
          this.alertMessage = error.error.message;
          this.showAlert = true;
        }
      );
  }
  onSave() {
    const name = `${this.editProfileForm.value.firstName} ${
      this.editProfileForm.value.middleName
        ? this.editProfileForm.value.middleName
        : ''
    } ${this.editProfileForm.value.lastName}`;
    const address = this.editProfileForm.value.address;
    const phone = this.editProfileForm.value.phone;

    this.profileService.updateProfile(name, address, phone).subscribe(
      (res) => {
        console.log(res);

        if (res.statusCode === 201) {
          this.router.navigate(['']);
        } else {
          this.alertMessage = res.data;
          this.showAlert = true;
        }
      },
      (error) => {
        this.alertMessage = error.error.message;
        this.showAlert = true;
      }
    );
  }
}
