export type Profile = {
    firstName: string;
    lastName: string;
    image: string;
    description: string;
    email: string;
    phone: string;
}

export const defaultProfile = (): Profile => {
    return {
        firstName: '',
        lastName: '',
        image: '',
        description: '',
        email: '',
        phone: ''
    }
}