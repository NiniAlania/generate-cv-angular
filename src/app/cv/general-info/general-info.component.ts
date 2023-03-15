import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { defaultProfile, Profile } from 'src/app/models/profile.model';
import { CvService } from 'src/app/services/cv.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit {
  profile: Profile = defaultProfile();

  firstNameFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(2),
    Validators.pattern("[ა-ჰ]*")
  ]);

  lastNameFormControl = new FormControl("", [
    Validators.required,
    Validators.minLength(2),
    Validators.pattern("[ა-ჰ]*")
  ]);

  photoFormControl = new FormControl("", [
    Validators.required
  ]
  );

  descriptionFormControl = new FormControl("", [
    Validators.pattern("[ა-ჰ,.!?\\s]*")
  ]);

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  phoneFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("^\\+9955\\d{8}$")
  ]);

  isValid = true;

  constructor(private cvService: CvService, private router: Router) { }

  ngOnInit(): void {
    this.cvService.profile.subscribe((profile) => {
      this.profile = profile;
      this.validate();
    });
    this.cvService.restoreCV();
  }

  validate() {
    if (this.profile.image) {
      this.photoFormControl.clearValidators();
    }
    this.firstNameFormControl.updateValueAndValidity();
    this.lastNameFormControl.updateValueAndValidity();
    this.photoFormControl.updateValueAndValidity();
    this.descriptionFormControl.updateValueAndValidity();
    this.phoneFormControl.updateValueAndValidity();
    this.isValid = (
      this.firstNameFormControl.valid &&
      this.lastNameFormControl.valid &&
      this.photoFormControl.valid &&
      this.descriptionFormControl.valid &&
      this.emailFormControl.valid &&
      this.phoneFormControl.valid
    );
  }

  onInputChange() {
    this.validate();

    if (!Object.keys(this.profile).every(key => this.profile[key as keyof Profile] === '')) {
      this.cvService.setProfile(this.profile);
    }
  }

  onImageSelected(event: any) {
    const image = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {

      if (reader.result) {
        const base64String = reader.result.toString();
        this.profile.image = base64String;
        this.cvService.setProfile(this.profile);
      }
    }
    reader.readAsDataURL(image);
  }

  nextPage() {
    this.router.navigate(["/work-experience"]);
  }

}
