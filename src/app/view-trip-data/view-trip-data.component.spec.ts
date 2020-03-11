import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTripDataComponent } from './view-trip-data.component';

describe('ViewTripDataComponent', () => {
  let component: ViewTripDataComponent;
  let fixture: ComponentFixture<ViewTripDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTripDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTripDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
