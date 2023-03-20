import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartConfigComponent } from './smart-config.component';

describe('SmartConfigComponent', () => {
  let component: SmartConfigComponent;
  let fixture: ComponentFixture<SmartConfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartConfigComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmartConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
