import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadOneTaskComponent } from './read-one-task.component';

describe('ReadOneTaskComponent', () => {
  let component: ReadOneTaskComponent;
  let fixture: ComponentFixture<ReadOneTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadOneTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadOneTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
