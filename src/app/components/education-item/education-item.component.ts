import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
    Validators.pattern("[ა-ჰ,\\s]*")
  ]);

  startDateFormControl = new FormControl("", [
    Validators.required
  ]);

  endDateFormControl = new FormControl("", [
    Validators.required
  ]);

  descriptionFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("[ა-ჰ,.!?\\s]*")
  ]);

  isValid = false;

  constructor() { }

  ngOnInit(): void {
    this.validate();
    this.educationValid.emit(this.isValid);
  }

  validate() {
    this.institutionFormControl.updateValueAndValidity();
    this.startDateFormControl.updateValueAndValidity();
    this.endDateFormControl.updateValueAndValidity();
    this.descriptionFormControl.updateValueAndValidity();

    this.isValid = (
      this.institutionFormControl.valid &&
      this.startDateFormControl.valid &&
      this.endDateFormControl.valid &&
      this.descriptionFormControl.valid
    );
  }

  onInputChange() {
    this.validate();
    this.educationChanged.emit(this.education);
    this.educationValid.emit(this.isValid);
  }
}
