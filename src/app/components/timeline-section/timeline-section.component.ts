import { Component, Input } from '@angular/core';
import { Education, EducationItem } from '../../models/education';
import { ExperienceItem } from '../../models/experience';

@Component({
  selector: 'app-timeline-section',
  standalone: true,
  imports: [],
  templateUrl: './timeline-section.component.html',
  styleUrl: './timeline-section.component.css',
})
export class TimelineSectionComponent {
  @Input() title = '';
  @Input() img = '';
  @Input() timeline: ExperienceItem[] | EducationItem[] = [];

  getCountry(item: ExperienceItem|EducationItem) {
    return 'country' in item ? ` (${item.country})` : '';
  }

  getPlace(item: ExperienceItem|EducationItem) {
    return 'school' in item ? item.school : item.company;
  }

  getPeriod(item: ExperienceItem|EducationItem) {
    return item.endDate ? `${this.formatDateMonthYear(item.initDate)} - ${this.formatDateMonthYear(item.endDate)}` : `${this.formatDateMonthYear(item.initDate)} - Now`;
  }

  getTitle(item: ExperienceItem|EducationItem) {
    return 'degree' in item ? item.degree : item.role;
  } 

  private formatDateMonthYear(date: Date): string {
    return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
  }
}
