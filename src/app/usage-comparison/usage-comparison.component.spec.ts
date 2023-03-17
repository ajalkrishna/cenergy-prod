import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageComparisonComponent } from './usage-comparison.component';

describe('UsageComparisonComponent', () => {
  let component: UsageComparisonComponent;
  let fixture: ComponentFixture<UsageComparisonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsageComparisonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsageComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
