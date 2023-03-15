import { Component, OnInit } from '@angular/core';
import { combineLatest, combineLatestAll } from 'rxjs';
import { Education } from 'src/app/models/education.model';
import { Experience } from 'src/app/models/experience.model';
import { defaultProfile, Profile } from 'src/app/models/profile.model';
import { CvService } from 'src/app/services/cv.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent implements OnInit {
  profile: Profile = defaultProfile();
  educations: Education[] = [];
  workExperiences: Experience[] = [];

  constructor(private cvService: CvService) {
    
  }

  ngOnInit(): void {
    this.cvService.profile.subscribe((profile) => {
      this.profile = profile;
    });
    combineLatest([this.cvService.education, this.cvService.educationValid]).subscribe(([educations, educationsValid]) => {
      this.educations = educations.filter((e, i) => educationsValid[i]);
    });
    
    combineLatest([this.cvService.workExperience, this.cvService.workExperienceValid]).subscribe(([workExperience, workExperienceValid]) => {
      this.workExperiences = workExperience.filter((e, i) => workExperienceValid[i]);
    });
    
    this.cvService.restoreCV();
  }
}
