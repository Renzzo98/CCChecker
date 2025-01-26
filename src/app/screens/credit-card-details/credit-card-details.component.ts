import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { CreditCard } from '../../models/credit-card.model';
import { CreditCardService } from '../../services/credit-card.service';
import { getCardTypeColor } from '../../utils/card-type-utils';

@Component({
  selector: 'app-credit-card-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './credit-card-details.component.html',
  styleUrl: './credit-card-details.component.scss'
})
export class CreditCardDetailsComponent implements OnInit {
  creditCard!: CreditCard;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private creditCardService: CreditCardService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = Number(params['id']);
      console.log('Route ID:', id);
      
      this.creditCardService.getCreditCards().subscribe(cards => {
        const card = cards.find(c => c.id === id);
        console.log('Found card:', card);
        
        if (!card) {
          this.router.navigate(['/admin/cards']);
          return;
        }
        
        this.creditCard = card;
        this.viewportScroller.scrollToPosition([0, 0]);
      });
    });
  }

  handleEdit() {
    this.router.navigate(['/admin/card/edit', this.creditCard.id]);
  }

  handleDelete() {
    this.creditCardService.deleteCreditCard(this.creditCard.id);
    this.router.navigate(['/admin/cards']);
  }

  goBack() {
    this.router.navigate(['/admin/cards']);
  }

  getTypeBadgeStyle() {
    return {
      'background-color': getCardTypeColor(this.creditCard.type)
    };
  }
}
