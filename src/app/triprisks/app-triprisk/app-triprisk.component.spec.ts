import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppTripRiskComponent } from './app-triprisk.component';

describe('AppTripRiskComponent', () => {
  let component: AppTripRiskComponent;
  let fixture: ComponentFixture<AppTripRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppTripRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppTripRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
