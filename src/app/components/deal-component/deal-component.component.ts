import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Deal, DealTypeIcons } from '../../models/deal.model';

@Component({
  selector: 'app-deal',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './deal-component.component.html',
  styleUrls: ['./deal-component.component.scss']
})
export class DealComponent {
  @Input() deal!: Deal;
  dealTypeIcons = DealTypeIcons;

  constructor(private router: Router) {}

  getValueColor(): string {
    const value = this.deal.value.toLowerCase();
    if (value.includes('%')) {
      const percent = parseFloat(value);
      if (percent >= 5) return 'high-value';
      if (percent >= 3) return 'medium-value';
      return 'low-value';
    }
    if (value.includes('$')) {
      const amount = parseFloat(value.replace('$', ''));
      if (amount >= 100) return 'high-value';
      if (amount >= 50) return 'medium-value';
      return 'low-value';
    }
    return 'default-value';
  }

  navigateToDetails() {
    this.router.navigate(['/deals', this.deal.id], {
      state: { 
        returnToHome: true
      }
    });
  }
} 