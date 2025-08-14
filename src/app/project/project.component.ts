import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  @Input() title = '';
  @Input() img = '';
  @Input() tags: string[] = [];
  @Input() url = '';
}
