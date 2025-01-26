import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardsCenterComponent } from './credit-cards-center.component';

describe('CreditCardsCenterComponent', () => {
  let component: CreditCardsCenterComponent;
  let fixture: ComponentFixture<CreditCardsCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCardsCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardsCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
