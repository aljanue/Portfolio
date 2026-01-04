export interface CategoryModel {
    name: string;
    projects: ProjectModel[];
}

export class ProjectModel {
  id?: number;
  title = '';
  portrait = '';
  tags: string[] = [];
  link = '';
  descriptions: string[] = [];
  videos: string[] = [];
  images: string[] = [];

  constructor(init?: Partial<ProjectModel>) {
    if (init) {
      Object.assign(this, init);
    }
  }
}

export interface CategoryModel {
  category: string;
  projects: ProjectModel[];
}
