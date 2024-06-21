import { Component, OnInit } from '@angular/core';
import { SendingService } from '../send-form.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  title="Contact";
  currentUrl: string = "";


  constructor(private sendingService: SendingService, private location: Location, private router: Router) { } // Inyecta Router
  
  ngOnInit(): void{
    if(this.sendingService.getSending()){
      this.sendForm();
    }
    this.currentUrl = window.location.origin + this.router.createUrlTree(['/check-form']).toString(); // Genera la URL completa a check-form
    console.log(this.currentUrl);
  }

  change(): void {
    if(!this.sendingService.getSending()){
      const name = document.getElementById('name') as HTMLInputElement;
      const email = document.getElementById('email') as HTMLInputElement;
      const subject = document.getElementById('subject') as HTMLInputElement;
      const message = document.getElementById('message') as HTMLInputElement;
    
      const emailRegex = /^[^\s@]+@[^\s@]+$/;
    
      if (name.value && emailRegex.test(email.value) && subject.value && message.value) {
        this.sendingService.setSending(true);
        this.sendForm();
      }
    }
  }

  sendForm(){
    const container = document.querySelector(".btn-container");
    const continue_s = document.getElementById('continue');
    const hoverAnimation = document.querySelector(".text-hover");
    if (container && hoverAnimation && continue_s) {
      container.classList.toggle("active");
      hoverAnimation.textContent = "Sending";
      continue_s.textContent = 'You can continue viewing my portfolio while it is being sent :)';
    }
  }
}
