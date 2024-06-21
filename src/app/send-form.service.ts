import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SendingService {
  sending = false;

  getSending(){
    return this.sending;
  }
  setSending(value: boolean){
    this.sending = value;
  }
}