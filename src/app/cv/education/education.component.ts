import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { combineLatest } from 'rxjs';
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
  }

  ngOnInit(): void {
    combineLatest([this.cvService.education, this.cvService.educationValid]).subscribe(([educations, educationsValid]) => {
      this.educations = educations;
      this.educationsValid = educationsValid;
      this.isValid = this.educationsValid.every((isValid) => isValid);
    });

    this.cvService.restoreCV();
  }

  onEducationChanged(education: Education, index: number) {
    this.educations[index] = education;
    if (!Object.keys(education).every(key => education[key as keyof Education] === '')) {
      this.cvService.setEducation(this.educations);
    }
  }

  onEducationValidChanged(isValid: boolean, index: number) {
    this.educationsValid[index] = isValid;
    this.isValid = this.educationsValid.every((isValid) => isValid);
    if (!Object.keys(this.educations[index]).every(key => this.educations[index][key as keyof Education] === '')) {
      this.cvService.setEducationValid(this.educationsValid);
    }
  }

  onAddEducation() {
    this.educations.push(defaultEducation());
    this.educationsValid.push(false);
    this.isValid = false;
  }

  prevPage() {
    this.router.navigate(['/work-experience']);
  }

  nextPage() {
    this.cvService.saveCV();
    this.router.navigate(['/result']);
  }

}  
