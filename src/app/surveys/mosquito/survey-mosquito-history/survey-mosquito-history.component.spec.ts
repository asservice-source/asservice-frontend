import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMosquitoHistoryComponent } from './survey-mosquito-history.component';

describe('SurveyMosquitoHistoryComponent', () => {
  let component: SurveyMosquitoHistoryComponent;
  let fixture: ComponentFixture<SurveyMosquitoHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyMosquitoHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMosquitoHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
