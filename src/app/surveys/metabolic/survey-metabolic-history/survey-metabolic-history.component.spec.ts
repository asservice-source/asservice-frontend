import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMetabolicHistoryComponent } from './survey-metabolic-history.component';

describe('SurveyMetabolicHistoryComponent', () => {
  let component: SurveyMetabolicHistoryComponent;
  let fixture: ComponentFixture<SurveyMetabolicHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyMetabolicHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMetabolicHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
