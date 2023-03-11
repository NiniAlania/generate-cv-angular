import { Education } from './education.model';
import { Experience } from './experience.model';
import { Profile } from './profile.model';

export type CV = {
    profile: Profile;
    educations: Education[];
    workExperiences: Experience[];
}