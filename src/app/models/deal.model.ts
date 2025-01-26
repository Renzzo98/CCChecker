import { CreditCard } from './credit-card.model';
import { faComputer, faGasPump, faMusic, faShirt, faShoppingCart, IconDefinition } from '@fortawesome/free-solid-svg-icons';
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
  type: DealType;
  value: string;  // e.g., "10%", "$5", "2X points"
  startDate: Date;
  endDate: Date;
  description: string;
  cards: number[];
}

export enum DealType {
    DINING = 'DINING',
    SHOPPING = 'SHOPPING',
    CLOTHING = 'CLOTHING',
    ELECTRONICS = 'ELECTRONICS',
    TRAVEL = 'TRAVEL',
    GROCERY = 'GROCERY',
    GAS = 'GAS',
    CONCERT = 'CONCERT',
    OTHER = 'OTHER'
}

export const DealTypeIcons: Record<DealType, IconDefinition> = {
    [DealType.DINING]: faUtensils,
    [DealType.SHOPPING]: faShoppingCart,
    [DealType.CLOTHING]: faShirt,
    [DealType.ELECTRONICS]: faComputer,
    [DealType.TRAVEL]: faPlane,
    [DealType.GROCERY]: faUtensils,
    [DealType.GAS]: faGasPump,
    [DealType.CONCERT]: faMusic,
    [DealType.OTHER]: faGift
}; 