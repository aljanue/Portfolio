import { Component } from '@angular/core';
import { AboutCardComponent } from '../about-card/about-card.component';
import { ContentfulService } from '../../services/contentful.service';
import { forkJoin } from 'rxjs';
import { DoingCard } from '../../models/what_im_doing';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [AboutCardComponent],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  title = 'About Me';
  description: string = '';
  doing_cards: DoingCard[] = [];

  constructor(private contentfulService: ContentfulService) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    forkJoin({
      doingCards: this.contentfulService.getDoingCards(),
      aboutMe: this.contentfulService.getPersonalInfo(),
    }).subscribe(({ doingCards, aboutMe }) => {
      this.doing_cards = doingCards.map((item: any) => ({
        title: item.fields.title,
        img: item.fields.image,
        description: item.fields.description,
      }));
      const aboutMeData = aboutMe[0].fields;
      this.description = aboutMeData.description;
    });
  }
}
