import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCard } from '../../models/credit-card.model';
import { Router } from '@angular/router';
import { getCardTypeColor } from '../../utils/card-type-utils';

@Component({
  selector: 'app-credit-card-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credit-card-component.component.html',
  styleUrl: './credit-card-component.component.scss'
})
export class CreditCardComponentComponent {

  @Input() creditCard!: CreditCard;

  constructor(private router: Router) {}

  navigateToDetails() {
    this.router.navigate(['/admin/card', this.creditCard.id]);
  }

  getTypeBadgeStyle() {
    return {
      'background-color': getCardTypeColor(this.creditCard.type)
    };
  }
}
