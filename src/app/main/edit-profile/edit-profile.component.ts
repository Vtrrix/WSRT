import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private profileService: ProfileService, private router: Router) {
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
  }
  onSave() {
    const name = `${this.editProfileForm.value.firstName} ${this.editProfileForm.value.middleName} ${this.editProfileForm.value.lastName}`;
    const address = this.editProfileForm.value.address;
    const phone = this.editProfileForm.value.phone;

    this.profileService.updateProfile(name, address, phone).subscribe(
      (data) => {
        if (data[1] === 201) {
          this.router.navigate(['']);
        } else {
          this.alertMessage = data[0];
          this.showAlert = true;
        }
      },
      (error) => {
        this.alertMessage = error.message;

        this.showAlert = true;
      }
    );
  }
}
