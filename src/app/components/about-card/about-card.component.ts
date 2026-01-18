import { Component, input } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-about-card',
  standalone: true,
  imports: [],
  templateUrl: './about-card.component.html',
  styleUrl: './about-card.component.css',
})
export class AboutCardComponent {
  @Input() title = '';
  @Input() img = '';
  @Input() description = '';
  @Input() entity = '';
  @Input() date: Date | null = null;

  formatDate(date: Date) {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  }
}
