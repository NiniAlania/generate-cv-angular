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
  private educationValidSource = new BehaviorSubject<boolean[]>([false]);
  private workExperienceSource = new BehaviorSubject<Experience[]>([defaultExperience()]);
  private workExperienceValidSource = new BehaviorSubject<boolean[]>([false]);

  profile = this.profileSource.asObservable();
  education = this.educationSource.asObservable();
  educationValid = this.educationValidSource.asObservable();
  workExperience = this.workExperienceSource.asObservable();
  workExperienceValid = this.workExperienceValidSource.asObservable();

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

  setEducationValid(valid: boolean[]) {
    if (valid.length > 0) {
      this.sessionStorage.store('educationValid', valid);
    }
    this.educationValidSource.next(valid);
  }

  setWorkExperience(workExperience: Experience[]) {
    if (workExperience.length > 0) {
      this.sessionStorage.store('workExperience', workExperience);
    }
    this.workExperienceSource.next(workExperience);
  }

  setWorkExperienceValid(valid: boolean[]) {
    if (valid.length > 0) {
      this.sessionStorage.store('workExperienceValid', valid);
    }
    this.workExperienceValidSource.next(valid);
  }

  restoreCV() {
    const profile = this.sessionStorage.retrieve('profile');
    const education = this.sessionStorage.retrieve('education');
    const educationValid = this.sessionStorage.retrieve('educationValid');
    const workExperience = this.sessionStorage.retrieve('workExperience');
    const workExperienceValid = this.sessionStorage.retrieve('workExperienceValid');

    if (profile) {
      this.profileSource.next(profile);
    }

    if (education) {
      this.educationSource.next(education);
      this.educationValidSource.next(educationValid);
    }

    if (workExperience) {
      this.workExperienceSource.next(workExperience);
      this.workExperienceValidSource.next(workExperienceValid);
    }
  }

  clearCV() {
    this.sessionStorage.clear('profile');
    this.sessionStorage.clear('education');
    this.sessionStorage.clear('educationValid');
    this.sessionStorage.clear('workExperience');
    this.sessionStorage.clear('workExperienceValid');
    this.profileSource.next(defaultProfile());
    this.educationSource.next([defaultEducation()]);
    this.educationValidSource.next([false]);
    this.workExperienceSource.next([defaultExperience()]);
    this.workExperienceValidSource.next([false]);
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
