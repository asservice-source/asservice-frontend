import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMetabolicComponent } from './survey-metabolic.component';

describe('MetabolicComponent', () => {
  let component: SurveyMetabolicComponent;
  let fixture: ComponentFixture<SurveyMetabolicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyMetabolicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMetabolicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
