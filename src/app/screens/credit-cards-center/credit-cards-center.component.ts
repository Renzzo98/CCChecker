import { Component, OnInit, OnDestroy } from '@angular/core';
import { CreditCardListComponent } from '../../components/credit-card-list/credit-card-list.component';
import { CreditCard } from '../../models/credit-card.model';
import { CreditCardService } from '../../services/credit-card.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-cards-center',
  standalone: true,
  imports: [CreditCardListComponent],
  templateUrl: './credit-cards-center.component.html',
  styleUrl: './credit-cards-center.component.scss'
})
export class CreditCardsCenterComponent implements OnInit, OnDestroy {
  creditCards: CreditCard[] = [];
  private subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private creditCardService: CreditCardService
  ) {}

  ngOnInit() {
    this.subscription.add(
      this.creditCardService.getCreditCards().subscribe(
        cards => this.creditCards = cards
      )
    );
  }

  goBack() {
    this.router.navigate(['/admin']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addNewCard() {
    this.router.navigate(['/admin/card/new']);
  }
}