import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetZeroComponent } from './net-zero.component';

describe('NetZeroComponent', () => {
  let component: NetZeroComponent;
  let fixture: ComponentFixture<NetZeroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetZeroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetZeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
