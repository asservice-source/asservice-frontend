import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPatientListComponent } from './survey-patient-list.component';

describe('SurveyPatientListComponent', () => {
  let component: SurveyPatientListComponent;
  let fixture: ComponentFixture<SurveyPatientListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPatientListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPatientListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
