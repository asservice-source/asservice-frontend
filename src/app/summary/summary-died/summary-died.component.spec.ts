import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryDiedComponent } from './summary-died.component';

describe('SummaryDiedComponent', () => {
  let component: SummaryDiedComponent;
  let fixture: ComponentFixture<SummaryDiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummaryDiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummaryDiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
