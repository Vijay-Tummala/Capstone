import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadRisksComponent } from './read-risks.component';

describe('ReadRisksComponent', () => {
  let component: ReadRisksComponent;
  let fixture: ComponentFixture<ReadRisksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadRisksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadRisksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
