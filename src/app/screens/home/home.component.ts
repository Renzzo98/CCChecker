import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { faGear, faUser, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { DealService } from '../../services/deal.service';
import { CreditCardService } from '../../services/credit-card.service';
import { Deal } from '../../models/deal.model';
import { CreditCard } from '../../models/credit-card.model';
import { DealListComponent } from '../../components/deal-list/deal-list.component';
import { ThemeService } from '../../services/theme.service';

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
  email: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  faGear = faGear;
  faUser = faUser;
  faSun = faSun;
  faMoon = faMoon;
  filteredDeals: Deal[] = [];
  allDeals: Deal[] = [];
  isSearching = false;
  isLoading = false;
  errorMessage: string = '';
  isDarkTheme$ = this.themeService.isDarkTheme$;

  constructor(
    public authService: AuthService,
    private router: Router,
    private dealService: DealService,
    private creditCardService: CreditCardService,
    public themeService: ThemeService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
    });
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
    if (this.searchQuery.trim()) {
      this.isSearching = true;
      this.filteredDeals = this.getActiveDeals().filter(deal => 
        deal.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
      
      // Clear error if results are found
      if (this.filteredDeals.length > 0) {
        this.errorMessage = '';
      } else {
        this.errorMessage = `No deals found for "${this.searchQuery}"`;
      }
    } else {
      this.isSearching = false;
      this.filteredDeals = [];
      this.errorMessage = '';
    }
  }

  toggleLoginPopup() {
    console.log('Toggling login popup');
    this.showLoginPopup = !this.showLoginPopup;
  }

  async onLogin() {
    try {
      const success = await this.authService.login(this.email, this.password);
      if (success) {
        this.toggleLoginPopup();
        this.email = '';
        this.password = '';
      }
    } catch (error: any) {
      let message = 'Login failed';
      if (error.code === 'auth/invalid-email') {
        message = 'Invalid email format';
      } else if (error.code === 'auth/user-not-found') {
        message = 'User not found';
      } else if (error.code === 'auth/wrong-password') {
        message = 'Invalid password';
      }
      alert(message);
    }
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
} 