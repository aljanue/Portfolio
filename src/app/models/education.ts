export interface Education {
    title: string;
    img: string;
    educations: EducationItem[];
}
export interface EducationItem {
    degree: string;
    school: string;
    initDate: Date;
    endDate?: Date;
    country: Date;
}