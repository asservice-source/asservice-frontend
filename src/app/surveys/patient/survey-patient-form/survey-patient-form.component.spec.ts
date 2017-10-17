import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPatientFormComponent } from './survey-patient-form.component';

describe('SurveyPatientFormComponent', () => {
  let component: SurveyPatientFormComponent;
  let fixture: ComponentFixture<SurveyPatientFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPatientFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPatientFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
