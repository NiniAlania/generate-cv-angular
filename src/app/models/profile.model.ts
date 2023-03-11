export type Profile = {
    firstName: string;
    lastName: string;
    image: string;
    description: string;
    email: string;
    phone: string;
}

export const defaultProfile: Profile = {
    firstName: '',
    lastName: '',
    image: '',
    description: '',
    email: '',
    phone: ''
}

Object.keys(defaultProfile).every(key => defaultProfile[key as keyof Profile] === '')

const profilesJsonString = '[{"firstName":"John","lastName":"Doe","image":"https://example.com/image1.jpg","description":"Lorem ipsum","email":"john@example.com","phone":"123-456-7890"},{"firstName":"Jane","lastName":"Doe","image":"https://example.com/image2.jpg","description":"Dolor sit amet","email":"jane@example.com","phone":"555-555-5555"}]';
const profilesJson = JSON.parse(profilesJsonString);

const profiles: Profile[] = profilesJson;