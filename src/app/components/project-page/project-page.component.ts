import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectModel, CategoryModel } from '../../models/project';
import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [CommonModule, ProjectComponent],
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css'],
})
export class ProjectPageComponent {
  @Input() data?: ProjectModel | null;
  @Output() back = new EventEmitter<void>();

  constructor() {}

  selectRelatedProject(project: ProjectModel): void {
    this.data = project;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onBack(): void {
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
