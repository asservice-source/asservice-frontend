import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMetabolicFormComponent } from './survey-metabolic-form.component';

describe('SurveyMetabolicFormComponent', () => {
  let component: SurveyMetabolicFormComponent;
  let fixture: ComponentFixture<SurveyMetabolicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyMetabolicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMetabolicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
