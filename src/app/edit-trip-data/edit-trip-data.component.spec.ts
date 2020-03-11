import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTripDataComponent } from './edit-trip-data.component';

describe('EditTripDataComponent', () => {
  let component: EditTripDataComponent;
  let fixture: ComponentFixture<EditTripDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTripDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTripDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
