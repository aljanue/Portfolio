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
  @Input() project: any;
  @Input() title = '';
  @Input() img = '';
  @Input() tags: string[] = [];
  @Input() link = '';

  constructor(private router: Router) {}

  openProject() {
    const proj = this.project ?? { id: undefined, title: this.title, img: this.img, tags: this.tags, link: this.link };
    const id = proj?.id ?? proj?.title;
    this.router.navigate(['/project', id], { state: { project: proj } });
  }
}
