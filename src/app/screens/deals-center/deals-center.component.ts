import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealListComponent } from '../../components/deal-list/deal-list.component';
import { DealService } from '../../services/deal.service';
import { Deal } from '../../models/deal.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deals-center',
  standalone: true,
  imports: [CommonModule, DealListComponent, FontAwesomeModule],
  templateUrl: './deals-center.component.html',
  styleUrls: ['./deals-center.component.scss']
})
export class DealsCenterComponent implements OnInit {
  deals: Deal[] = [];
  showActiveOnly = false;
  faArrowLeft = faArrowLeft;
  faPlus = faPlus;

  constructor(private dealService: DealService, private router: Router) {}

  ngOnInit() {
    this.loadDeals();
  }

  loadDeals() {
    this.dealService.getDeals().subscribe(deals => {
      this.deals = this.showActiveOnly ? this.filterActiveDeals(deals) : deals;
    });
  }

  toggleActiveDeals() {
    this.showActiveOnly = !this.showActiveOnly;
    this.loadDeals();
  }

  private filterActiveDeals(deals: Deal[]): Deal[] {
    const now = new Date();
    return deals.filter(deal => {
      const startDate = new Date(deal.startDate);
      const endDate = new Date(deal.endDate);
      return startDate <= now && endDate >= now;
    });
  }

  goBack() {
    this.router.navigate(['/admin']);
  }

  createNewDeal() {
    this.router.navigate(['/admin/deal/new']);
  }
}
