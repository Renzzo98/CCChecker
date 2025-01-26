import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IconButtonComponent } from '../../components/icon-button/icon-button.component';
import { faCreditCard, faDollarSign, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-admin-center',
  standalone: true,
  imports: [CommonModule, IconButtonComponent, FontAwesomeModule],
  templateUrl: './admin-center.component.html',
  styleUrls: ['./admin-center.component.scss']
})
export class AdminCenterComponent {
  faCreditCard = faCreditCard;
  faDeals = faDollarSign;
  faArrowLeft = faArrowLeft;

  constructor(private router: Router) {}

  navigateToCards() {
    // Will implement later
    console.log('Navigate to cards management');
    this.router.navigate(['/admin/cards']);
  }

  navigateToRules() {
    // Will implement later
    console.log('Navigate to rules management');
    this.router.navigate(['/admin/rules']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
