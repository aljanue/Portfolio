import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { Router } from '@angular/router';
import { DeviceDetectorService } from './device-detector.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, ProfileComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private deviceDetectorService: DeviceDetectorService,
  ) {}

  ngOnInit() {
    if (this.deviceDetectorService.isMobile()) {
      this.router.navigate(['/home']);
    }
  }
}
