import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-info',
  standalone: true,
  imports: [],
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.css',
})
export class ProfileInfoComponent {
  @Input() info = '';
  @Input() icon = '';
  @Input() socialmedia = '';
  @Input() url = '';
}
