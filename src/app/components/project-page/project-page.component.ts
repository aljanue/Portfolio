import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProjectModel, CategoryModel } from '../../models/project';
import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ProjectComponent],
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit, OnChanges {
  @Input() data?: ProjectModel | null;
  @Output() back = new EventEmitter<void>();
  
  id: string | null = null;
  relatedProjects: ProjectModel[] = [];
  currentCategory: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.loadRelatedProjects();
    }
  }

  ngOnInit(): void {
    // If data is already provided via @Input, we're done
    if (this.data) {
      return;
    }

    this.id = this.route.snapshot.paramMap.get('id');

    const navState = this.router.getCurrentNavigation()?.extras?.state as any;
    const navProject = (navState && navState['project']) || ((history.state && (history.state as any)['project']) as any);
    if (navProject) {
      this.data = new ProjectModel(navProject);
      // Still need to load related projects from the same category
      this.loadRelatedProjects();
      return;
    }

    this.http.get<CategoryModel[]>('/assets/projects.json').subscribe({
      next: (categories) => {
        let foundCategory: CategoryModel | undefined;
        let found: any = null;

        // Find the project and its category
        for (const category of categories) {
          const project = (category.projects ?? []).find((p: any) => String(p.id) === String(this.id));
          if (project) {
            found = project;
            foundCategory = category;
            break;
          }
        }

        if (found && foundCategory) {
          if (!found.img && found.portrait) {
            found.img = found.portrait;
          }
          this.data = new ProjectModel(found);
          this.currentCategory = foundCategory.name;
          
          // Load related projects from the same category (excluding current project)
          this.relatedProjects = (foundCategory.projects ?? [])
            .filter((p: any) => String(p.id) !== String(this.id))
            .map((p: any) => new ProjectModel({
              ...p,
              img: p.portrait || p.img
            }));
        } else {
          this.router.navigate(['/not-found']);
        }
      },
      error: (err) => {
        console.error('Error fetching projects.json', err);
        this.router.navigate(['/not-found']);
      }
    });
  }

  private loadRelatedProjects(): void {
    console.log('Loading related projects for:', this.data?.id);
    this.http.get<CategoryModel[]>('/assets/projects.json').subscribe({
      next: (categories) => {
        let foundCategory: CategoryModel | undefined;

        // Find the category of the current project
        for (const category of categories) {
          const project = (category.projects ?? []).find((p: any) => String(p.id) === String(this.data?.id));
          if (project) {
            foundCategory = category;
            console.log('Found category:', foundCategory.name);
            break;
          }
        }

        if (foundCategory) {
          this.currentCategory = foundCategory.name;
          
          // Load related projects from the same category (excluding current project)
          this.relatedProjects = (foundCategory.projects ?? [])
            .filter((p: any) => String(p.id) !== String(this.data?.id))
            .map((p: any) => new ProjectModel({
              ...p,
              img: p.portrait || p.img
            }));
          console.log('Related projects loaded:', this.relatedProjects.length);
        } else {
          console.log('Category not found for project:', this.data?.id);
        }
      },
      error: (err) => {
        console.error('Error fetching projects.json', err);
      }
    });
  }

  onBack() {
    this.back.emit();
  }

  hasContent(): boolean {
    const hasDescriptions = this.data?.descriptions && this.data.descriptions.length > 0;
    const hasImages = this.data?.images && this.data.images.length > 0;
    const hasVideos = this.data?.videos && this.data.videos.length > 0;
    return !!(hasDescriptions || hasImages || hasVideos);
  }
  
  getContentItems(): Array<{ type: 'description' | 'images-row'; content: any }> {
    const items: Array<{ type: 'description' | 'images-row'; content: any }> = [];
    
    const descriptions = this.data?.descriptions || [];
    const images = this.data?.images || [];
    
    const maxLength = Math.max(descriptions.length, Math.ceil(images.length / 2));
    
    for (let i = 0; i < maxLength; i++) {
      if (i < descriptions.length) {
        items.push({ type: 'description', content: descriptions[i] });
      }
      
      const imageIndex = i * 2;
      if (imageIndex < images.length) {
        const imageRow = [images[imageIndex]];
        if (imageIndex + 1 < images.length) {
          imageRow.push(images[imageIndex + 1]);
        }
        items.push({ type: 'images-row', content: imageRow });
      }
    }
    
    return items;
  }
}
