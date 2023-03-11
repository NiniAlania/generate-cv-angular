import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  

  constructor() { }

  ngOnInit(): void {
  }

  onInputChange() {
    this.educationChanged.emit(this.education);
  }
  

}
