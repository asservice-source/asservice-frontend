import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMosquitoFormComponent } from './survey-mosquito-form.component';

describe('SurveyMosquitoFormComponent', () => {
  let component: SurveyMosquitoFormComponent;
  let fixture: ComponentFixture<SurveyMosquitoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyMosquitoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMosquitoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
