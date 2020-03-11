import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOneTripRiskComponent } from './read-one-triprisk.component';

describe('ReadOneTripRiskComponent', () => {
  let component: ReadOneTripRiskComponent;
  let fixture: ComponentFixture<ReadOneTripRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadOneTripRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOneTripRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
