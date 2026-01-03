export interface CategoryModel {
    name: string;
    projects: ProjectModel[];
}

export class ProjectModel {
  id?: number;
  title = '';
  portrait = '';
  tags: string[] = [];
  url = '';

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
