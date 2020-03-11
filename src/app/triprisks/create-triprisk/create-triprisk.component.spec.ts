import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTripRiskComponent } from './create-triprisk.component';

describe('CreateTripRiskComponent', () => {
  let component: CreateTripRiskComponent;
  let fixture: ComponentFixture<CreateTripRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTripRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTripRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
