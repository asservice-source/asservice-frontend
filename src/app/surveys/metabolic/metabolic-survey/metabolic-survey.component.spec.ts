import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetabolicSurveyComponent } from './metabolic-survey.component';

describe('MetabolicSurveyComponent', () => {
  let component: MetabolicSurveyComponent;
  let fixture: ComponentFixture<MetabolicSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetabolicSurveyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetabolicSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
