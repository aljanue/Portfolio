export interface AboutMe {
    name: string;
    role: string;
    email: string;
    github: SocialMedia;
    linkedin: SocialMedia;
    description: string;
    birthday: Date;
    phone: string;
}

export interface SocialMedia {
    url: string
    username: string
}