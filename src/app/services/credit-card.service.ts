import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CreditCard } from '../models/credit-card.model';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private readonly STORAGE_KEY = 'credit_cards';
  private creditCards: CreditCard[] = [];
  private creditCardsSubject = new BehaviorSubject<CreditCard[]>([]);
  creditCards$ = this.creditCardsSubject.asObservable();

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    const storedCards = localStorage.getItem(this.STORAGE_KEY);
    if (storedCards) {
      this.creditCards = JSON.parse(storedCards);
      this.creditCardsSubject.next(this.creditCards);
    } else {
      // Initialize with default data if storage is empty
      this.creditCards = [
        {
          id: 1,
          bank: 'Well Banks',
          name: 'Red Card',
          type: 'Visa',
          image: 'assets/images/credit-cards/Credit-Card-Test.png',
          description: 'This is the description of the card. It is a test description. The Red Card is a test card. You can edit this description to make it more interesting.'
        }
      ];
      this.saveToLocalStorage();
    }
  }

  private saveToLocalStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.creditCards));
    this.creditCardsSubject.next(this.creditCards);
  }

  getCreditCards(): Observable<CreditCard[]> {
    return this.creditCards$;
  }

  getCreditCardById(id: number): CreditCard | undefined {
    return this.creditCards.find(card => card.id === id);
  }

  addCreditCard(card: CreditCard): void {
    this.creditCards = [...this.creditCards, card];
    this.saveToLocalStorage();
  }

  updateCreditCard(updatedCard: CreditCard): void {
    this.creditCards = this.creditCards.map(card => 
      card.id === updatedCard.id ? updatedCard : card
    );
    this.saveToLocalStorage();
  }

  deleteCreditCard(id: number): void {
    this.creditCards = this.creditCards.filter(card => card.id !== id);
    this.saveToLocalStorage();
  }
} 