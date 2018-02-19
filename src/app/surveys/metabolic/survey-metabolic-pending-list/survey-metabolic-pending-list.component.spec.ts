import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMetabolicPendingListComponent } from './survey-metabolic-pending-list.component';

describe('SurveyMetabolicPendingListComponent', () => {
  let component: SurveyMetabolicPendingListComponent;
  let fixture: ComponentFixture<SurveyMetabolicPendingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyMetabolicPendingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMetabolicPendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
