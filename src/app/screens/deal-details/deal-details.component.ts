import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Deal } from '../../models/deal.model';
import { CreditCard } from '../../models/credit-card.model';
import { DealService } from '../../services/deal.service';
import { CreditCardService } from '../../services/credit-card.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DealTypeIcons } from '../../models/deal.model';
import { faEdit, faTrash, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-deal-details',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './deal-details.component.html',
  styleUrls: ['./deal-details.component.scss']
})
export class DealDetailsComponent implements OnInit {
  deal?: Deal;
  relatedCards: CreditCard[] = [];
  dealTypeIcons = DealTypeIcons;
  faEdit = faEdit;
  faTrash = faTrash;
  faArrowLeft = faArrowLeft;
  isAdmin = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dealService: DealService,
    private creditCardService: CreditCardService,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.dealService.getDeals().subscribe(deals => {
      this.deal = deals.find(d => d.id === id);
      if (!this.deal) {
        this.router.navigate(['/admin/deals']);
        return;
      }
      
      this.loadRelatedCards();
    });

    this.authService.isAuthenticated$.subscribe(
      isAuthenticated => this.isAdmin = isAuthenticated
    );
  }

  private loadRelatedCards() {
    if (!this.deal) return;
    
    this.creditCardService.getCreditCards().subscribe(cards => {
      this.relatedCards = cards.filter(card => 
        this.deal?.cards.includes(card.id)
      );
    });
  }

  goBack() {
    if (this.isAdmin) {
      this.router.navigate(['/admin/deals']);
    } else {
      this.location.back();
    }
  }

  getDealStatus(): { text: string; class: string } {
    if (!this.deal) return { text: '', class: '' };
    
    const now = new Date();
    const startDate = new Date(this.deal.startDate);
    const endDate = new Date(this.deal.endDate);

    if (now < startDate) {
      return { text: 'PENDING', class: 'status-pending' };
    } else if (now > endDate) {
      return { text: 'EXPIRED', class: 'status-expired' };
    } else {
      return { text: 'ACTIVE', class: 'status-active' };
    }
  }

  editDeal() {
    if (this.deal) {
      this.router.navigate(['/admin/deal/edit', this.deal.id]);
    }
  }

  confirmDelete() {
    if (confirm('Are you sure you want to delete this deal?') && this.deal) {
      this.dealService.deleteDeal(this.deal.id);
      this.router.navigate(['/admin/deals']);
    }
  }
} 