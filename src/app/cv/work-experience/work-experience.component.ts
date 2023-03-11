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
  workExperiences: Experience[] = [defaultExperience]

  constructor(private cvService: CvService, private router: Router) {
    cvService.workExperience.subscribe((workExperiences) => {
      this.workExperiences = workExperiences;
    });

    this.cvService.restoreCV();
  }

  ngOnInit(): void {
  }

  onWorkExperienceChanged(workExperience: Experience, index: number) {
    this.workExperiences[index] = workExperience;
    this.cvService.setWorkExperience(this.workExperiences);
  }

  onAddExperience() {
    this.cvService.setWorkExperience([...this.workExperiences, Object.assign({}, defaultExperience)]);
  }

  prevPage() {
    this.router.navigate(['/general-info']);
  }

  nextPage() {
    this.router.navigate(['/education']);
  }
}
