import { CreditCard } from './credit-card.model';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { 
  faDollarSign, 
  faUtensils, 
  faPlane, 
  faPercent,
  faGift
} from '@fortawesome/free-solid-svg-icons';

export interface Deal {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  cards: number[]; // Array of credit card IDs
  type: DealType;
  description?: string;
}

export enum DealType {
  CASHBACK = 'Cashback',
  DINING = 'Dining',
  TRAVEL = 'Travel',
  POINTS = 'Points',
  OTHER = 'Other'
}

export const DealTypeIcons: Record<DealType, IconDefinition> = {
  [DealType.CASHBACK]: faDollarSign,
  [DealType.DINING]: faUtensils,
  [DealType.TRAVEL]: faPlane,
  [DealType.POINTS]: faPercent,
  [DealType.OTHER]: faGift
}; 