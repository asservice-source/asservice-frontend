import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPregnantFormComponent } from './survey-pregnant-form.component';

describe('SurveyPregnantFormComponent', () => {
  let component: SurveyPregnantFormComponent;
  let fixture: ComponentFixture<SurveyPregnantFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPregnantFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPregnantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
