export type Experience = {
    position: string;
    employer: string;
    startDate: string;
    endDate: string;
    description: string;
}

export const defaultExperience = (): Experience => {
    return {
        position: '',
        employer: '',
        startDate: '',
        endDate: '',
        description: ''
    }
}