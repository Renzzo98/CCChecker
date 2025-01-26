import { Component, OnInit } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CreditCard } from '../../models/credit-card.model';
import { CreditCardService } from '../../services/credit-card.service';
import { BANKS } from '../../constants/banks';
import { CARD_TYPES } from '../../constants/card-types';

@Component({
  selector: 'app-credit-card-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './credit-card-editor.component.html',
  styleUrls: ['./credit-card-editor.component.scss']
})
export class CreditCardEditorComponent implements OnInit {
  isEditing = false;
  card: Partial<CreditCard> = {};
  imagePreview: string | null = null;
  banks = BANKS;
  showCustomBank = false;
  cardTypes = CARD_TYPES;
  showCustomType = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private creditCardService: CreditCardService
  ) {}

  ngOnInit() {
    // Scroll to top immediately when component initializes
    this.viewportScroller.scrollToPosition([0, 0]);

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      const existingCard = this.creditCardService.getCreditCardById(Number(id));
      if (existingCard) {
        this.card = { ...existingCard };
      } else {
        this.router.navigate(['/admin/cards']);
      }
    }
  }

  onSubmit() {
    const missingFields: string[] = [];

    if (this.showCustomBank && !this.card.bank) {
      missingFields.push('Bank name');
    }

    if (!this.card.bank) {
      missingFields.push('Bank name');
    }
    if (!this.card.name) {
      missingFields.push('Card name');
    }
    if (!this.card.type) {
      missingFields.push('Card type');
    }
    if (!this.card.image && !this.imagePreview) {
      missingFields.push('Card image');
    }

    if (missingFields.length > 0) {
      alert(`Please fill in the following required fields:\n${missingFields.join('\n')}`);
      return;
    }

    if (this.isEditing) {
      this.creditCardService.updateCreditCard(this.card as CreditCard);
    } else {
      const newCard = {
        ...this.card,
        id: Date.now()
      } as CreditCard;
      this.creditCardService.addCreditCard(newCard);
    }
    this.router.navigate(['/admin/cards']);
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.card.image = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.imagePreview = null;
    this.card.image = '';
    // Reset file input if needed
    const fileInput = document.querySelector('#image') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  }

  isValidCard(): boolean {
    return !!(
      this.card.bank && 
      this.card.name && 
      this.card.type &&
      (this.card.image || this.imagePreview)
    );
  }
  

  goBack() {
    this.router.navigate(['/admin/cards']);
  }

  onBankChange(value: string) {
    if (value === 'Other') {
      this.showCustomBank = true;
      this.card.bank = '';
    } else {
      this.showCustomBank = false;
      this.card.bank = value;
    }
  }

  onCardTypeChange(value: string) {
    if (value === 'Other') {
      this.showCustomType = true;
      this.card.type = '';
    } else {
      this.showCustomType = false;
      this.card.type = value;
    }
  }
} 