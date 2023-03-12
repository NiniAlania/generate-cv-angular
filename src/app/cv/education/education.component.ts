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
  educationsValid: boolean[] = [false];

  constructor(private cvService: CvService, private router: Router) { 
    cvService.education.subscribe((educations) => {
      this.educations = educations;
      this.educationsValid = new Array(educations.length);
    });

    this.cvService.restoreCV();

  }

  ngOnInit(): void {
    
  }

  isValid() {
    console.log('all', this.educationsValid.every((x) => x))
    return this.educationsValid.every((x) => x);
  }

  onEducationChanged(education: Education, index: number) {
    this.educations[index] = education;
    this.cvService.setEducation(this.educations);
  }

  onEducationValidChanged(isValid: boolean, index: number) {
    console.log("change", isValid, index);
    this.educationsValid[index] = isValid;
    console.log(this.educationsValid);
  }

  onAddEducation() {
    this.cvService.setEducation([...this.educations, defaultEducation()]);
  }

  prevPage() {
    this.router.navigate(['/work-experience']);
  }

  nextPage() {
    this.cvService.saveCV();
    this.router.navigate(['/result']);
  }

}  
