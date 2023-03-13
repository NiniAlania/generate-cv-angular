import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { defaultEducation, Education } from 'src/app/models/education.model';
import { CvService } from 'src/app/services/cv.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  educations: Education[] = [defaultEducation()];
  educationsValid: boolean[] = [true];
  isValid = false;

  constructor(private cvService: CvService, private router: Router) { 
    cvService.education.subscribe((educations) => {
      this.educations = educations;
    });

    cvService.educationValid.subscribe((educationsValid) => {
      this.educationsValid = educationsValid;
    });

    this.cvService.restoreCV();

  }

  ngOnInit(): void {
    
  }

  onEducationChanged(education: Education, index: number) {
    this.educations[index] = education;
    this.cvService.setEducation(this.educations);
  }

  onEducationValidChanged(isValid: boolean, index: number) {
    this.educationsValid[index] = isValid;
    this.isValid = this.educationsValid.every((isValid) => isValid);
  }

  onAddEducation() {
    this.cvService.setEducation([...this.educations, defaultEducation()]);
    this.cvService.setEducationValid([...this.educationsValid, true]);
  }

  prevPage() {
    this.router.navigate(['/work-experience']);
  }

  nextPage() {
    this.cvService.saveCV();
    this.router.navigate(['/result']);
  }

}  
