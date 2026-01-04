import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [],
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent {
  // accept the whole project object (preferred) or individual fields
  @Input() project: any;
  @Input() title = '';
  @Input() img = '';
  @Input() tags: string[] = [];
  @Input() url = '';

  constructor(private router: Router) {}

  openProject() {
    const proj = this.project ?? { id: undefined, title: this.title, img: this.img, tags: this.tags, url: this.url };
    const id = proj?.id ?? proj?.title; // fallback if no id
    this.router.navigate(['/project', id], { state: { project: proj } });
  }
}
