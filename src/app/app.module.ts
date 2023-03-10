import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './cv/home/home.component';
import { EducationComponent } from './cv/education/education.component';
import { WorkExperienceComponent } from './cv/work-experience/work-experience.component';
import { ResumeComponent } from './cv/resume/resume.component';
import { GeneralInfoComponent } from './cv/general-info/general-info.component';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { HeaderComponent } from './shared/header/header.component';
import { BackgroundLeftComponent } from './shared/background-left/background-left.component';
import { BackgroundRightComponent } from './shared/background-right/background-right.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EducationComponent,
    WorkExperienceComponent,
    ResumeComponent,
    GeneralInfoComponent,
    HeaderComponent,
    BackgroundLeftComponent,
    BackgroundRightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgxWebstorageModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
