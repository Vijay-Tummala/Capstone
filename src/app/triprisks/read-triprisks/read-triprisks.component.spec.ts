import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadTripRisksComponent } from './read-triprisks.component';

describe('ReadTripRisksComponent', () => {
  let component: ReadTripRisksComponent;
  let fixture: ComponentFixture<ReadTripRisksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadTripRisksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadTripRisksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
