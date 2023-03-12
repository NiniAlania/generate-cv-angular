import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SessionStorageService } from 'ngx-webstorage';
import { BehaviorSubject } from 'rxjs';
import { CV } from '../models/cv.model';
import { defaultEducation, Education } from '../models/education.model';
import { defaultExperience, Experience } from '../models/experience.model';
import { defaultProfile, Profile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class CvService {
  private profileSource = new BehaviorSubject<Profile>(defaultProfile());
  private educationSource = new BehaviorSubject<Education[]>([defaultEducation()]);
  private workExperienceSource = new BehaviorSubject<Experience[]>([defaultExperience()]);

  profile = this.profileSource.asObservable();
  education = this.educationSource.asObservable();
  workExperience = this.workExperienceSource.asObservable();

  constructor(private sessionStorage: SessionStorageService, private firestore: AngularFirestore) { }

  setProfile(profile: Profile) {
    this.sessionStorage.store('profile', profile);
    this.profileSource.next(profile);
  }

  setEducation(education: Education[]) {
    const filteredEducation = education.filter((e) => !Object.keys(e).every(key => e[key as keyof Education] === ''));
    if (filteredEducation.length > 0) {
      this.sessionStorage.store('education', filteredEducation);
    }
    this.educationSource.next(education);
  }

  setWorkExperience(workExperience: Experience[]) {
    const filteredExperience = workExperience.filter((e) => !Object.keys(e).every(key => e[key as keyof Experience] === ''));
    if (filteredExperience.length > 0) {
      this.sessionStorage.store('workExperience', filteredExperience);
    }
    this.workExperienceSource.next(workExperience);
  }

  restoreCV() {
    const profile = this.sessionStorage.retrieve('profile');
    const education = this.sessionStorage.retrieve('education');
    const workExperience = this.sessionStorage.retrieve('workExperience');

    if (profile) {
      this.profileSource.next(profile);
    }

    if (education) {
      this.educationSource.next(education);
    }

    if (workExperience) {
      this.workExperienceSource.next(workExperience);
    }
  }

  clearCV() {
    this.sessionStorage.clear('profile');
    this.sessionStorage.clear('education');
    this.sessionStorage.clear('workExperience');
    this.profileSource.next(defaultProfile());
    this.educationSource.next([defaultEducation()]);
    this.workExperienceSource.next([defaultExperience()]);
  }

  saveCV() {
    const cv:CV = { 
      profile: this.profileSource.value,
      educations: this.educationSource.value,
      workExperiences: this.workExperienceSource.value
    }

    this.firestore.collection('cvs').add(cv).then(() => {
      console.log('added');
    });
    
  }
}
