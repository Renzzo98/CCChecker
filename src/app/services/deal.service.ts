import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Deal, DealType } from '../models/deal.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DealService {
  private readonly STORAGE_KEY = 'deals';
  private deals: Deal[] = [];
  private dealsSubject = new BehaviorSubject<Deal[]>([]);
  deals$ = this.dealsSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      const storedDeals = localStorage.getItem(this.STORAGE_KEY);
      if (storedDeals) {
        this.deals = JSON.parse(storedDeals, (key, value) => {
          if (key === 'startDate' || key === 'endDate') {
            return new Date(value);
          }
          return value;
        });
        this.dealsSubject.next(this.deals);
      } else {
        this.initializeDefaultDeals();
      }
    } else {
      this.initializeDefaultDeals();
    }
  }

  private initializeDefaultDeals() {
    this.deals = [
      {
        id: 1,
        name: 'Mobil Gas',
        value: '5%',
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-08-31'),
        cards: [1],
        type: DealType.GAS,
        description: '5% cashback on summer activities'
      }
    ];
    this.saveToLocalStorage();
  }

  private saveToLocalStorage() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.deals));
    }
    this.dealsSubject.next(this.deals);
  }

  getDeals(): Observable<Deal[]> {
    return this.deals$;
  }

  getDealById(id: number): Deal | undefined {
    return this.deals.find(deal => deal.id === id);
  }

  addDeal(deal: Deal): void {
    this.deals = [...this.deals, deal];
    this.saveToLocalStorage();
  }

  updateDeal(updatedDeal: Deal): void {
    this.deals = this.deals.map(deal => 
      deal.id === updatedDeal.id ? updatedDeal : deal
    );
    this.saveToLocalStorage();
  }

  deleteDeal(id: number): void {
    this.deals = this.deals.filter(deal => deal.id !== id);
    this.saveToLocalStorage();
  }
} 