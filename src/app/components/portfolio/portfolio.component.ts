import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ProjectComponent } from '../project/project.component';
import { ProjectPageComponent } from '../project-page/project-page.component';
import { CategoryModel, ProjectModel } from '../../models/project';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [ProjectComponent, ProjectPageComponent, HttpClientModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  title = 'Portfolio';
  selectedCategory = 'All';
  categories: CategoryModel[] = [];
  selectedProject: ProjectModel | null = null;
  isAnimated = false; // Track if title and separator have been animated

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.http.get<any[]>('/assets/projects.json').subscribe({
      next: (data) => {
        this.categories = data;
        // Check if there's a project ID in the route params
        const projectId = this.route.snapshot.paramMap.get('id');
        if (projectId) {
          this.selectProject(projectId);
        } else {
          // Mark as animated after initial load
          setTimeout(() => {
            this.isAnimated = true;
          }, 1000); // After animation completes
        }
      },
      error: (err) => {
        console.error('Error loading projects.json', err);
        this.categories = [];
      },
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
  }

  selectProject(projectIdOrTitle: string) {
    const found = this.categories
      .flatMap((c: any) => c.projects ?? [])
      .find((p: any) => String(p.id) === String(projectIdOrTitle) || p.title === projectIdOrTitle);

    if (found) {
      if (!found.img && found.portrait) {
        found.img = found.portrait;
      }
      this.selectedProject = new ProjectModel(found);
      this.isAnimated = true; // Prevent animation when switching to project
    }
  }

  backToPortfolio() {
    this.selectedProject = null;
  }
}
