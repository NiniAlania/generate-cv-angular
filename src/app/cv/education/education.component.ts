import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { defaultEducation, Education } from 'src/app/models/education.model';
import { CvService } from 'src/app/services/cv.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {
  educations: Education[] = [defaultEducation()]

  constructor(private cvService: CvService, private router: Router) { 
    cvService.education.subscribe((educations) => {
      this.educations = educations;
    });

    this.cvService.restoreCV();

  }

  ngOnInit(): void {
  }

  onEducationChanged(education: Education, index: number) {
    this.educations[index] = education;
    this.cvService.setEducation(this.educations);
  }

  onAddEducation() {
    this.cvService.setEducation([...this.educations, defaultEducation()]);
  }

  prevPage() {
    this.router.navigate(['/work-experience']);
  }

  nextPage() {
    this.cvService.saveCV();
    this.router.navigate(['/resume']);
  }

}  
