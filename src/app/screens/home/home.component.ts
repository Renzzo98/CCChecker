import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { faGear, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DealService } from '../../services/deal.service';
import { CreditCardService } from '../../services/credit-card.service';
import { Deal } from '../../models/deal.model';
import { CreditCard } from '../../models/credit-card.model';
import { DealListComponent } from '../../components/deal-list/deal-list.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule, DealListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchQuery = '';
  showLoginPopup: boolean = false;
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  faGear = faGear;
  faUser = faUser;
  filteredDeals: Deal[] = [];
  allDeals: Deal[] = [];
  isSearching = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private dealService: DealService,
    private creditCardService: CreditCardService
  ) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(
      isAuthenticated => this.isLoggedIn = isAuthenticated
    );
    this.dealService.getDeals().subscribe(deals => {
      this.allDeals = deals;
    });
  }

  private getActiveDeals(): Deal[] {
    const now = new Date();
    return this.allDeals.filter(deal => {
      const startDate = new Date(deal.startDate);
      const endDate = new Date(deal.endDate);
      return startDate <= now && now <= endDate;
    });
  }

  onSearch() {
    if (!this.searchQuery.trim()) {
      this.filteredDeals = [];
      this.isSearching = false;
      return;
    }

    this.isSearching = true;
    const query = this.searchQuery.toLowerCase();
    const activeDeals = this.getActiveDeals();
    
    this.filteredDeals = activeDeals.filter(deal => 
      deal.name.toLowerCase().includes(query) ||
      deal.type.toLowerCase().includes(query) ||
      deal.description.toLowerCase().includes(query)
    );
  }

  toggleLoginPopup() {
    console.log('Toggling login popup');
    this.showLoginPopup = !this.showLoginPopup;
  }

  onLogin() {
    if (this.authService.login(this.username, this.password)) {
      this.toggleLoginPopup();
      // Login successful
    } else {
      alert('Invalid credentials');
    }
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }
} 