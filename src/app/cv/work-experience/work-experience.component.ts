import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { defaultExperience, Experience } from 'src/app/models/experience.model';
import { CvService } from 'src/app/services/cv.service';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnInit {
  workExperiences: Experience[] = [defaultExperience()]
  workExperiencesValid: boolean[] = [true];
  isValid = true;

  constructor(private cvService: CvService, private router: Router) {
    cvService.workExperience.subscribe((workExperiences) => {
      this.workExperiences = workExperiences;
    });

    cvService.workExperienceValid.subscribe((workExperiencesValid) => {
      this.workExperiencesValid = workExperiencesValid;
    });

    this.cvService.restoreCV();
  }

  ngOnInit(): void {
  }

  onWorkExperienceChanged(workExperience: Experience, index: number) {
    this.workExperiences[index] = workExperience;
    this.cvService.setWorkExperience(this.workExperiences);
  }

  onWorkExperienceValidChanged(isValid: boolean, index: number) {
    this.workExperiencesValid[index] = isValid;
    this.isValid = this.workExperiencesValid.every((isValid) => isValid);
  }

  onAddExperience() {
    this.cvService.setWorkExperience([...this.workExperiences, defaultExperience()]);
    this.cvService.setWorkExperienceValid([...this.workExperiencesValid, true]);
  }

  prevPage() {
    this.router.navigate(['/general-info']);
  }

  nextPage() {
    this.router.navigate(['/education']);
  }
}
