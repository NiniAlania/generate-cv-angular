import { Component, OnInit } from '@angular/core';
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

    this.cvService.education.subscribe((educations) => {
      this.educations = educations.filter((e) => !Object.keys(e).every(key => e[key as keyof Education] === ''));
    });

    this.cvService.workExperience.subscribe((workExperience) => {
      this.workExperiences = workExperience.filter((e) => !Object.keys(e).every(key => e[key as keyof Experience] === ''));
    });
    
    this.cvService.restoreCV();
  }
}