import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { firebaseApp, analytics } from './config/firebase.config';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'credit-card-deals-checker';

  constructor(private meta: Meta) {
    this.meta.addTags([
      { name: 'description', content: 'Find the best credit card deals and rewards' },
      { name: 'keywords', content: 'credit cards, rewards, cashback, deals' }
    ]);
  }
}
