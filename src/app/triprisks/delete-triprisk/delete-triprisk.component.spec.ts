import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTripRiskComponent } from './delete-triprisk.component';

describe('DeleteTripRiskComponent', () => {
  let component: DeleteTripRiskComponent;
  let fixture: ComponentFixture<DeleteTripRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTripRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTripRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
