import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Deal, DealType } from '../../models/deal.model';
import { DealService } from '../../services/deal.service';
import { CreditCardService } from '../../services/credit-card.service';
import { CreditCard } from '../../models/credit-card.model';
import { RelatedCardComponent } from '../../components/related-card/related-card.component';

@Component({
  selector: 'app-deal-editor',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    FontAwesomeModule,
    RelatedCardComponent
  ],
  templateUrl: './deal-editor.component.html',
  styleUrls: ['./deal-editor.component.scss']
})
export class DealEditorComponent implements OnInit {
  dealForm: FormGroup;
  isNewDeal = true;
  dealTypes = Object.values(DealType);
  availableCards: CreditCard[] = [];
  faArrowLeft = faArrowLeft;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private dealService: DealService,
    private creditCardService: CreditCardService
  ) {
    this.dealForm = this.fb.group({
      name: ['', Validators.required],
      type: [DealType.CASHBACK, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: [''],
      cards: [[], Validators.required]
    });
  }

  ngOnInit() {
    this.loadCards();
    const id = this.route.snapshot.paramMap.get('id');
    
    if (id && id !== 'new') {
      this.isNewDeal = false;
      this.loadDeal(Number(id));
    }
  }

  private loadCards() {
    this.creditCardService.getCreditCards().subscribe(cards => {
      this.availableCards = cards;
    });
  }

  private loadDeal(id: number) {
    const deal = this.dealService.getDealById(id);
    if (deal) {
      this.dealForm.patchValue({
        name: deal.name,
        type: deal.type,
        startDate: this.formatDate(new Date(deal.startDate)),
        endDate: this.formatDate(new Date(deal.endDate)),
        description: deal.description,
        cards: deal.cards
      });
    }
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  onSubmit() {
    if (this.dealForm.valid) {
      const formValue = this.dealForm.value;
      const deal: Deal = {
        id: this.isNewDeal ? this.generateId() : Number(this.route.snapshot.paramMap.get('id')),
        name: formValue.name,
        type: formValue.type,
        startDate: new Date(formValue.startDate),
        endDate: new Date(formValue.endDate),
        description: formValue.description,
        cards: formValue.cards
      };

      if (this.isNewDeal) {
        this.dealService.addDeal(deal);
      } else {
        this.dealService.updateDeal(deal);
      }

      this.router.navigate(['/admin/deals']);
    }
  }

  private generateId(): number {
    return Math.floor(Math.random() * 10000);
  }

  goBack() {
    this.router.navigate(['/admin/deals']);
  }

  onCardSelection(cardId: number) {
    const currentCards = this.dealForm.get('cards')?.value || [];
    const index = currentCards.indexOf(cardId);
    
    if (index === -1) {
      this.dealForm.patchValue({ cards: [...currentCards, cardId] });
    } else {
      this.dealForm.patchValue({ 
        cards: currentCards.filter((id: number) => id !== cardId)
      });
    }
  }
} 