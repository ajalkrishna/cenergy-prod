import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumptionCardComponent } from './consumption-card.component';

describe('ConsumptionCardComponent', () => {
  let component: ConsumptionCardComponent;
  let fixture: ComponentFixture<ConsumptionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumptionCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
