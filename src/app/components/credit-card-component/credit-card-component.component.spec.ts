import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardComponentComponent } from './credit-card-component.component';

describe('CreditCardComponentComponent', () => {
  let component: CreditCardComponentComponent;
  let fixture: ComponentFixture<CreditCardComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreditCardComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditCardComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
