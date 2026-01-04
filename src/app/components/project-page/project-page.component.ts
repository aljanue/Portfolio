import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProjectModel } from '../../models/project';

@Component({
  selector: 'app-project-page',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  @Input() data?: ProjectModel | null;
  @Output() back = new EventEmitter<void>();
  
  id: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

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
      return;
    }

    this.http.get<any[]>('/assets/projects.json').subscribe({
      next: (categories) => {
        const found = categories
          .flatMap((c: any) => c.projects ?? [])
          .find((p: any) => String(p.id) === String(this.id));

        if (found) {
          if (!found.img && found.portrait) {
            found.img = found.portrait;
          }
          this.data = new ProjectModel(found);
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

  onBack() {
    this.back.emit();
  }
}
