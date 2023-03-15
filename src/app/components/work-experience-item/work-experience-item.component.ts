import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { defaultExperience, Experience } from 'src/app/models/experience.model';

@Component({
  selector: 'app-work-experience-item',
  templateUrl: './work-experience-item.component.html',
  styleUrls: ['./work-experience-item.component.css']
})
export class WorkExperienceItemComponent implements OnInit {
  @Input() workExperience: Experience = defaultExperience();
  @Output() workExperienceChanged = new EventEmitter<Experience>();
  @Output() workExperienceValid = new EventEmitter<boolean>();

  positionFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("[ა-ჰ\\s]*")
  ]);

  employerFormControl = new FormControl("", [
    Validators.required,
    Validators.pattern("[ა-ჰ\\s]*")
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

  constructor() {
  }

  ngOnInit(): void {
    this.validate();
    this.workExperienceValid.emit(this.isValid);
  }

  validate() {
    this.positionFormControl.updateValueAndValidity();
    this.employerFormControl.updateValueAndValidity();
    this.startDateFormControl.updateValueAndValidity();
    this.endDateFormControl.updateValueAndValidity();
    this.descriptionFormControl.updateValueAndValidity();

    this.isValid = (
      this.positionFormControl.valid &&
      this.employerFormControl.valid &&
      this.startDateFormControl.valid &&
      this.endDateFormControl.valid &&
      this.descriptionFormControl.valid
    );
  }

  onInputChange() {
    this.validate();
    this.workExperienceChanged.emit(this.workExperience);
    this.workExperienceValid.emit(this.isValid);
  }
}
