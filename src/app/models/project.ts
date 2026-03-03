export interface ProjectModel {
  id?: number;
  title: string;
  portrait: string;
  tags: string[];
  projectLink: string;
  repoLink: string;
  descriptions: string[];
  videos: string[];
  images: string[];
  category: string;
  isSpecial?: boolean;
  relatedProjects?: ProjectModel[];
}

export interface CategoryModel {
  name: string;
  projects: ProjectModel[];
}
