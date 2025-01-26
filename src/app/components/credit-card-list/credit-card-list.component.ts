import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardComponentComponent } from '../credit-card-component/credit-card-component.component';
import { CreditCard } from '../../models/credit-card.model';

@Component({
  selector: 'app-credit-card-list',
  standalone: true,
  imports: [CommonModule, CreditCardComponentComponent],
  template: `
    <div class="credit-card-list">
      <app-credit-card-component 
        *ngFor="let card of creditCards" 
        [creditCard]="card"
      >
      </app-credit-card-component>
    </div>
  `,
  styleUrl: './credit-card-list.component.scss'
})
export class CreditCardListComponent {
  @Input() creditCards: CreditCard[] = [];
} 