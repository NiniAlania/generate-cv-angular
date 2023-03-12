import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EducationComponent } from './cv/education/education.component';
import { GeneralInfoComponent } from './cv/general-info/general-info.component';
import { HomeComponent } from './cv/home/home.component';
import { ResultComponent } from './cv/result/result.component';
import { WorkExperienceComponent } from './cv/work-experience/work-experience.component';

const routes: Routes = [
  {
    path: '',
    component:  HomeComponent
  },
  {
    path: 'general-info',
    component: GeneralInfoComponent
  },
  {
    path: 'work-experience',
    component: WorkExperienceComponent
  },
  {
    path: 'education',
    component: EducationComponent
  },
  {
    path: 'result',
    component: ResultComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
