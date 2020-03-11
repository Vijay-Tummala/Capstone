import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRiskComponent } from './app-risk.component';

describe('AppRiskComponent', () => {
  let component: AppRiskComponent;
  let fixture: ComponentFixture<AppRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
