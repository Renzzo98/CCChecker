import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Deal } from '../../models/deal.model';
import { DealComponent } from '../deal-component/deal-component.component';
@Component({
  selector: 'app-deal-list',
  standalone: true,
  imports: [CommonModule, DealComponent],
  templateUrl: './deal-list.component.html',
  styleUrls: ['./deal-list.component.scss']
})
export class DealListComponent {
  @Input() deals: Deal[] = [];
} 