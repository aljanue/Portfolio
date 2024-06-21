import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-timeline-section',
  standalone: true,
  imports: [],
  templateUrl: './timeline-section.component.html',
  styleUrl: './timeline-section.component.css'
})
export class TimelineSectionComponent {
  @Input() title = "";
  @Input() img = "";
  @Input() timeline: { id: number; title: string; date: string; place: string; }[] = [];
}
