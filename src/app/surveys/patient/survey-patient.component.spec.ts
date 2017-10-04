import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPatientComponent } from './survey-patient.component';

describe('PatientComponent', () => {
  let component: SurveyPatientComponent;
  let fixture: ComponentFixture<SurveyPatientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPatientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
