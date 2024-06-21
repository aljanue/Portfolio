import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { BurgerMenuComponent } from '../burger-menu/burger-menu.component';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, BurgerMenuComponent, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements AfterViewInit {
  constructor(private cdRef: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }
}
