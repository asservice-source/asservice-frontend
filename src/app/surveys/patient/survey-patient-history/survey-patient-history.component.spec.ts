import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPatientHistoryComponent } from './survey-patient-history.component';

describe('SurveyPatientHistoryComponent', () => {
  let component: SurveyPatientHistoryComponent;
  let fixture: ComponentFixture<SurveyPatientHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPatientHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPatientHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
