import { Component, Input, OnInit } from '@angular/core';
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
    Validators.pattern("[ა-ჰ]*")
  ]);

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  phoneFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("^\\+9955\\d{8}$")
  ]);

  constructor(private cvService: CvService, private router: Router) {
    cvService.profile.subscribe((profile) => {
      this.profile = profile;
    })  
    cvService.restoreCV();
  }

  ngOnInit(): void {
  }

  isValid() {
    return (
      this.firstNameFormControl.valid && 
      this.lastNameFormControl.valid && 
      this.photoFormControl.valid &&
      this.descriptionFormControl.valid &&
      this.emailFormControl.valid && 
      this.phoneFormControl.valid
    )
    
  }

  onInputChange() {
    this.cvService.setProfile(this.profile);
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
