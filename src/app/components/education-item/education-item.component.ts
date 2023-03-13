import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { EventManager } from '@angular/platform-browser';
import { defaultEducation, Education } from 'src/app/models/education.model';

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.css']
})
export class EducationItemComponent implements OnInit {

  @Input() education: Education = defaultEducation();
  @Output() educationChanged = new EventEmitter<Education>();
  @Output() educationValid = new EventEmitter<boolean>();
  
  institutionFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("[ა-ჰ]*")
  ]);

  startDateFormControl = new FormControl("", [
    Validators.required
  ]);

  endDateFormControl = new FormControl("", [
    Validators.required
  ]);

  descriptionFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("[ა-ჰ]*")
  ]);

  constructor() {
    
  }

  ngOnInit(): void {
    
  }

  ngOnChanges() {
    this.educationValid.emit(this.isValid());
  }

  isValid() {
    return (
      this.institutionFormControl.valid &&
      this.startDateFormControl.valid &&
      this.endDateFormControl.valid &&
      this.descriptionFormControl.valid
    ) || (
      this.institutionFormControl.pristine && 
      this.startDateFormControl.pristine && 
      this.endDateFormControl.pristine &&
      this.descriptionFormControl.pristine
    );
  }

  onInputChange() {
    this.educationChanged.emit(this.education);
    this.educationValid.emit(this.isValid());
  }

  schoolAdded() {
    
  }
  

}
