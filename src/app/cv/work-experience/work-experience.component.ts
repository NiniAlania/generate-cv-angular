import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { defaultExperience, Experience } from 'src/app/models/experience.model';
import { CvService } from 'src/app/services/cv.service';

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.css']
})
export class WorkExperienceComponent implements OnInit {
  workExperiences: Experience[] = [defaultExperience()]
  workExperiencesValid: boolean[] = [false];
  isValid = false;

  constructor(private cvService: CvService, private router: Router) {
  }

  ngOnInit(): void {
    combineLatest([this.cvService.workExperience, this.cvService.workExperienceValid]).subscribe(([workExperience, workExperienceValid]) => {
      this.workExperiences = workExperience;
      this.workExperiencesValid = workExperienceValid;
      this.isValid = workExperienceValid.every((isValid) => isValid);
    });
    
    this.cvService.restoreCV();
  }

  onWorkExperienceChanged(workExperience: Experience, index: number) {
    this.workExperiences[index] = workExperience;
    if (!Object.keys(workExperience).every(key => workExperience[key as keyof Experience] === '')) {
      this.cvService.setWorkExperience(this.workExperiences);
    }
  }

  onWorkExperienceValidChanged(isValid: boolean, index: number) {
    this.workExperiencesValid[index] = isValid;
    this.isValid = this.workExperiencesValid.every((isValid) => isValid);

    if (!Object.keys(this.workExperiences[index]).every(key => this.workExperiences[index][key as keyof Experience] === '')) {
      this.cvService.setWorkExperienceValid(this.workExperiencesValid);
    }
  }

  onAddExperience() {
    this.workExperiences.push(defaultExperience());
    this.workExperiencesValid.push(false);
    this.isValid = false;
  }

  prevPage() {
    this.router.navigate(['/general-info']);
  }

  nextPage() {
    this.router.navigate(['/education']);
  }
}
