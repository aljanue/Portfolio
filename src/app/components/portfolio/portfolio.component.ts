import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectComponent } from '../project/project.component';
import { ProjectPageComponent } from '../project-page/project-page.component';
import { CategoryModel, ProjectModel } from '../../models/project';
import { ContentfulService } from '../../services/contentful.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [ProjectComponent, ProjectPageComponent],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  title = 'Portfolio';
  selectedCategory = 'All';
  categoriesWithProjects: CategoryModel[] = [];
  selectedProject: ProjectModel | null = null;
  isAnimated = false;

  projects: ProjectModel[] = [];

  constructor(
    private contentfulService: ContentfulService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProjects();
  }

private loadProjects() {
    this.contentfulService.getProjects().subscribe({
      next: (entry) => {
        console.log('Personal Info Entry:', entry);
        const projectsMap = new Map<number, ProjectModel>();
        
        entry.forEach((project: any) => {
          console.log('Project Entry:', project.fields);
          const projectData = project.fields;
          const newProject: ProjectModel = {
            id: projectData.id,
            title: projectData.title,
            portrait: projectData.thumbnail.fields.file.url,
            tags: projectData.tags || [],
            category: projectData.category,
            projectLink: projectData.projectUrl || '',
            repoLink: projectData.repositoryUrl || '',
            descriptions: this.getDescriptions(projectData.description),
            videos: projectData.videos
              ? projectData.videos.map((video: any) => video.fields.file.url)
              : [],
            images: projectData.images
              ? projectData.images.map((img: any) => img.fields.file.url)
              : [],
          };
          projectsMap.set(projectData.id, newProject);
          this.projects.push(newProject);
        });
        
        this.categorizeProjects();

        this.setRelatedProjects();
      },
      error: (err) => console.error('Error fetching About:', err)
    });
  }
  private getDescriptions(descriptionField: string): string[] {
    return descriptionField ? descriptionField.split("\\newparagraph").map(desc => desc.trim()).filter(desc => desc.length > 0) : [];
  }

  private categorizeProjects() {
    const categoryMap: { [key: string]: ProjectModel[] } = {};
    this.projects.forEach((project) => {
      if (!categoryMap[project.category]) {
        categoryMap[project.category] = [];
      }
      categoryMap[project.category].push(project);
    });
    this.categoriesWithProjects = Object.keys(categoryMap).map((category) => ({
      name: category,
      projects: categoryMap[category],
    }));
  }

  private setRelatedProjects() {
    this.categoriesWithProjects.map((category: any) => {
      category.projects.forEach((project: ProjectModel) => {
        project.relatedProjects = category.projects.filter(
          (p: ProjectModel) => p.id !== project.id
        );
      });
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
  }
  selectProject(project: ProjectModel) {
    this.selectedProject = project;
  }
  backToPortfolio() {
    this.selectedProject = null;
  }
}
