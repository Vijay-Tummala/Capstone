import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRiskComponent } from './delete-risk.component';

describe('DeleteRiskComponent', () => {
  let component: DeleteRiskComponent;
  let fixture: ComponentFixture<DeleteRiskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteRiskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
