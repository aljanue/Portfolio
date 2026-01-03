import { Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ResumeComponent } from './components/resume/resume.component';
import { CheckFormComponent } from './components/check-form/check-form.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProjectPageComponent } from './components/project-page/project-page.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: '/about', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
  { path: 'resume', component: ResumeComponent },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'check-form', component: CheckFormComponent },
  { path: 'home', component: ProfileComponent },
  { path: 'project/:id', component: ProjectPageComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent }
];
