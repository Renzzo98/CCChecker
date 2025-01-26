import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <button class="icon-button" (click)="navigate()">
      <div class="icon">
        <fa-icon [icon]="icon" size="2x"></fa-icon>
      </div>
      <div class="title">{{ title }}</div>
    </button>
  `,
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent {
  @Input() icon!: IconDefinition;
  @Input() title: string = '';
  @Input() route: string = '';

  constructor(private router: Router) {}

  navigate() {
    if (this.route) {
      this.router.navigate([this.route]);
    }
  }
} 