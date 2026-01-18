import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { from, map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private client = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.accessToken
  });

  constructor() { }

  private getEntries(contentType: string): Observable<any[]> {
    const promise = this.client.getEntries({
      content_type: contentType,
      limit: 100
    });
    
    return from(promise).pipe(map(entryCollection => entryCollection.items));
  }


  getProjects() {
    return this.getEntries('project');
  }

  getExperience() {
    return this.getEntries('experience');
  }

  getEducation() {
    return this.getEntries('education');
  }

  getSkills() {
    return this.getEntries('skill');
  }

  getHonours() {
    return this.getEntries('honours');
  }

  getCertifications() {
    return this.getEntries('certifications');
  }

  getDoingCards() {
    return this.getEntries('whatImDoing');
  }

  getPersonalInfo() {
    return this.getEntries('aboutMe');
  }
}