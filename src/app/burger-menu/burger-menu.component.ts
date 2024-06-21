import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-burger-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './burger-menu.component.html',
  styleUrl: './burger-menu.component.css'
})
export class BurgerMenuComponent {
  menuOpen = false;

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }
}
