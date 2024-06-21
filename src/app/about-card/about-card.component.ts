import { Component } from '@angular/core';
import { Input } from '@angular/core';
@Component({
  selector: 'app-about-card',
  standalone: true,
  imports: [],
  templateUrl: './about-card.component.html',
  styleUrl: './about-card.component.css'
})
export class AboutCardComponent {
  @Input() title="";
  @Input() img="";
  @Input() description="";
}
