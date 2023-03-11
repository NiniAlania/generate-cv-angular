import { Component, Input, OnInit } from '@angular/core';
import { defaultProfile, Profile } from 'src/app/models/profile.model';
import { CvService } from 'src/app/services/cv.service';

@Component({
  selector: 'app-general-info',
  templateUrl: './general-info.component.html',
  styleUrls: ['./general-info.component.css']
})
export class GeneralInfoComponent implements OnInit {
  profile: Profile = defaultProfile;

  constructor(private cvService: CvService) {
    cvService.profile.subscribe((profile) => {
      this.profile = profile;
    })  
    cvService.restoreCV();
  }

  ngOnInit(): void {
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

}
