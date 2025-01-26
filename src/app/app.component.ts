import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'credit-card-deals-checker';

  constructor(private meta: Meta, private themeService: ThemeService) {
    this.meta.addTags([
      { name: 'description', content: 'Find the best credit card deals and rewards' },
      { name: 'keywords', content: 'credit cards, rewards, cashback, deals' }
    ]);

    this.themeService.isDarkTheme$.subscribe(isDark => {
      document.querySelector('html')?.classList.toggle('dark-theme', isDark);
    });
  }
}
