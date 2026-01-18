import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { from, map, Observable, of, shareReplay, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContentfulService {
  private client = createClient({
    space: environment.contentful.spaceId,
    accessToken: environment.contentful.accessToken,
  });

  private readonly CACHE_DURATION = 60 * 60 * 1000; // 1 hour

  private projectsCache$: Observable<any[]> | null = null;
  private experienceCache$: Observable<any[]> | null = null;
  private educationCache$: Observable<any[]> | null = null;
  private skillsCache$: Observable<any[]> | null = null;
  private honoursCache$: Observable<any[]> | null = null;
  private certificationsCache$: Observable<any[]> | null = null;
  private doingCardsCache$: Observable<any[]> | null = null;
  private personalInfoCache$: Observable<any[]> | null = null;

  constructor() {}

  private getDataWithCache(key: string, fetchFn: () => Observable<any[]>): Observable<any[]> {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        const { data, timestamp } = JSON.parse(stored);
        const now = new Date().getTime();

        if (now - timestamp < this.CACHE_DURATION) {
          return of(data);
        }
      } catch (e) {
        console.warn('Error reading local cache, requesting from API', e);
      }
    }

    return fetchFn().pipe(
      tap((data) => {
        const cacheEntry = { data, timestamp: new Date().getTime() };
        localStorage.setItem(key, JSON.stringify(cacheEntry));
      }),
      shareReplay(1)
    );
  }

  private getEntries(contentType: string): Observable<any[]> {
    const promise = this.client.getEntries({
      content_type: contentType,
      limit: 100,
    });
    return from(promise).pipe(map((entryCollection) => entryCollection.items));
  }

  getProjects() {
    if (!this.projectsCache$) {
      this.projectsCache$ = this.getDataWithCache('cache_projects', () =>
        this.getEntries('project')
      );
    }
    return this.projectsCache$;
  }

  getExperience() {
    if (!this.experienceCache$) {
      this.experienceCache$ = this.getDataWithCache('cache_experience', () =>
        this.getEntries('experience')
      );
    }
    return this.experienceCache$;
  }

  getEducation() {
    if (!this.educationCache$) {
      this.educationCache$ = this.getDataWithCache('cache_education', () =>
        this.getEntries('education')
      );
    }
    return this.educationCache$;
  }

  getSkills() {
    if (!this.skillsCache$) {
      this.skillsCache$ = this.getDataWithCache('cache_skills', () => this.getEntries('skill'));
    }
    return this.skillsCache$;
  }

  getHonours() {
    if (!this.honoursCache$) {
      this.honoursCache$ = this.getDataWithCache('cache_honours', () => this.getEntries('honours'));
    }
    return this.honoursCache$;
  }

  getCertifications() {
    if (!this.certificationsCache$) {
      this.certificationsCache$ = this.getDataWithCache('cache_certifications', () =>
        this.getEntries('certifications')
      );
    }
    return this.certificationsCache$;
  }

  getDoingCards() {
    if (!this.doingCardsCache$) {
      this.doingCardsCache$ = this.getDataWithCache('cache_doing_cards', () =>
        this.getEntries('whatImDoing')
      );
    }
    return this.doingCardsCache$;
  }

  getPersonalInfo() {
    if (!this.personalInfoCache$) {
      this.personalInfoCache$ = this.getDataWithCache('cache_personal_info', () =>
        this.getEntries('aboutMe')
      );
    }
    return this.personalInfoCache$;
  }

  clearCache() {
    localStorage.clear();
    this.projectsCache$ = null;
    this.experienceCache$ = null;
    this.educationCache$ = null;
    this.skillsCache$ = null;
    this.honoursCache$ = null;
    this.certificationsCache$ = null;
    this.doingCardsCache$ = null;
    this.personalInfoCache$ = null;
    console.log('🧹 Deleted Cache');
  }
}
