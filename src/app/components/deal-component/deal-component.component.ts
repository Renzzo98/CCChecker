import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Deal, DealTypeIcons } from '../../models/deal.model';

@Component({
  selector: 'app-deal-component',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './deal-component.component.html',
  styleUrl: './deal-component.component.scss'
})
export class DealComponentComponent {
  @Input() deal!: Deal;
  dealTypeIcons = DealTypeIcons;

  constructor(private router: Router) {}

  navigateToDetails() {
    this.router.navigate(['/admin/deal', this.deal.id]);
  }
} 