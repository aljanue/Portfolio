import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [],
  templateUrl: './project-page.component.html',
  styleUrl: './project-page.component.css'
})
export class ProjectPageComponent implements OnInit {
  id?: string | null;
  title?: string | null;
  images?: string[] | null;
  descriptions?: string[] | null;
  tags?: string[] | null;
  videos?: string[] | null;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    fetch('/assets/projects.json')
      .then(response => response.json())
      .then(data => {
        const project = data.find((proj: any) => proj.id === this.id);
        if (project) {
          this.title = project.title;
          this.images = project.images;
          this.descriptions = project.descriptions;
          this.tags = project.tags;
          this.videos = project.videos;
        } else {
          this.router.navigate(['/not-found']);
        }
      })
      .catch(error => {
        console.error('Error fetching project data:', error);
        this.router.navigate(['/not-found']);
      });
  }

}
