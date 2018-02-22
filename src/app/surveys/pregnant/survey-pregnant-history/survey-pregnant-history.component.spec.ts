import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPregnantHistoryComponent } from './survey-pregnant-history.component';

describe('SurveyPregnantHistoryComponent', () => {
  let component: SurveyPregnantHistoryComponent;
  let fixture: ComponentFixture<SurveyPregnantHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPregnantHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPregnantHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
