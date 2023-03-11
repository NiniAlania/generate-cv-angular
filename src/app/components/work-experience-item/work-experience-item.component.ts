import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { defaultExperience, Experience } from 'src/app/models/experience.model';

@Component({
  selector: 'app-work-experience-item',
  templateUrl: './work-experience-item.component.html',
  styleUrls: ['./work-experience-item.component.css']
})
export class WorkExperienceItemComponent implements OnInit {
  @Input() workExperience: Experience = defaultExperience();
  @Output() workExperienceChanged = new EventEmitter<Experience>();

  constructor() { }

  ngOnInit(): void {
  }

  onInputChange() {
    this.workExperienceChanged.emit(this.workExperience);
  }

}
