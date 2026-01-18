import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css',
})
export class NotFoundComponent {
  professionalMessages = [
    'Page Not Found',
    'The Requested Page Could Not Be Found',
    'This Page Doesn\'t Exist',
    'We Couldn\'t Find That Page',
    'Page Unavailable',
  ];

  currentMessage: string;

  constructor(private router: Router) {
    this.currentMessage = this.professionalMessages[Math.floor(Math.random() * this.professionalMessages.length)];
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
