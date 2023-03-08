import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './cv/home/home.component';
import { EducationComponent } from './cv/education/education.component';
import { WorkExperienceComponent } from './cv/work-experience/work-experience.component';
import { ResumeComponent } from './cv/resume/resume.component';
import { GeneralInfoComponent } from './cv/general-info/general-info.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EducationComponent,
    WorkExperienceComponent,
    ResumeComponent,
    GeneralInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
