export interface Experience {
  title: string;
  img: string;
  experiences: ExperienceItem[];
}

export interface ExperienceItem {
  role: string;
  company: string;
  initDate: Date;
  endDate?: Date;
  description?: string;
}
