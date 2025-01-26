import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { faGear, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchQuery: string = '';
  showLoginPopup: boolean = false;
  username: string = '';
  password: string = '';
  isLoggedIn: boolean = false;
  faGear = faGear;
  faUser = faUser;
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.isAuthenticated$.subscribe(
      isAuthenticated => this.isLoggedIn = isAuthenticated
    );
  }

  onSearch() {
    // Implement search logic here
    console.log('Searching for:', this.searchQuery);
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