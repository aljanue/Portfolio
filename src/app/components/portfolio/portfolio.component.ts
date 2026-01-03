import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProjectComponent } from '../project/project.component';
import { CategoryModel, ProjectModel } from '../../models/project';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [ProjectComponent, HttpClientModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  title = 'Portfolio';
  selectedCategory = 'All';
  categories: CategoryModel[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('/assets/projects.json').subscribe({
      next: (data) => (this.categories = data),
      error: (err) => {
        console.error('Error loading projects.json', err);
        this.categories = [];
      },
    });
  }

  filterByCategory(category: string) {
    this.selectedCategory = category;
  }
}
