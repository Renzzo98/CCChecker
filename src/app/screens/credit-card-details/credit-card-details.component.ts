import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import { CreditCard } from '../../models/credit-card.model';
import { CreditCardService } from '../../services/credit-card.service';
import { getCardTypeColor } from '../../utils/card-type-utils';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-credit-card-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './credit-card-details.component.html',
  styleUrl: './credit-card-details.component.scss'
})
export class CreditCardDetailsComponent implements OnInit {
  creditCard!: CreditCard;
  faEdit = faEdit;
  faTrash = faTrash;
  isAdmin = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private creditCardService: CreditCardService,
    private authService: AuthService
  ) {
    this.authService.isAuthenticated$.subscribe(
      isAuthenticated => this.isAdmin = isAuthenticated
    );
  }

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

  editCard() {
    this.router.navigate(['/admin/card/edit', this.creditCard.id]);
  }

  confirmDelete() {
    const confirmMessage = `Are you sure you want to delete "${this.creditCard.name}"? This action cannot be undone.`;
    
    if (window.confirm(confirmMessage)) {
      this.creditCardService.deleteCreditCard(this.creditCard.id);
      this.router.navigate(['/admin/cards']);
    }
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
