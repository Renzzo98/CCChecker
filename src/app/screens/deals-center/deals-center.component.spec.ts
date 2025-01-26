import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsCenterComponent } from './deals-center.component';

describe('DealsCenterComponent', () => {
  let component: DealsCenterComponent;
  let fixture: ComponentFixture<DealsCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealsCenterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealsCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
