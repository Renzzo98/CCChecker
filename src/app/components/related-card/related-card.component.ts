import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCard } from '../../models/credit-card.model';

@Component({
  selector: 'app-related-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="related-card" 
         [class.selected]="isSelected"
         (click)="onSelect()">
      <img [src]="card.image" [alt]="card.name">
      <p class="card-name">{{ card.name }}</p>
    </div>
  `,
  styles: [`
    .related-card {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        border-color: var(--primary);
      }

      &.selected {
        background-color: var(--primary);
        border-color: var(--primary);
      }

      img {
        width: 60px;
        height: 40px;
        object-fit: contain;
        border-radius: 4px;
      }

      .card-name {
        margin: 0;
        font-size: 0.9rem;
        color: var(--text-primary);
      }
    }
  `]
})
export class RelatedCardComponent {
  @Input() card!: CreditCard;
  @Input() isSelected = false;
  @Output() selected = new EventEmitter<number>();

  onSelect() {
    this.selected.emit(this.card.id);
  }
} 