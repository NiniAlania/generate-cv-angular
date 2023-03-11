export type Education = {
    institution: string;
    startDate: string;
    endDate: string;
    description: string;
}

export const defaultEducation = (): Education => {
    return {
        institution: '',
        startDate: '',
        endDate: '',
        description: ''
    }
}