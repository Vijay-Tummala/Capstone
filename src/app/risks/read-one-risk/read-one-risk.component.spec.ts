import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOneRiskComponent } from './read-one-risk.component';

describe('ReadOneRiskComponent', () => {
  let component: ReadOneRiskComponent;
  let fixture: ComponentFixture<ReadOneRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadOneRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOneRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
