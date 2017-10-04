import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPregnantDetailComponent } from './survey-pregnant-detail.component';

describe('DetailpregnantComponent', () => {
  let component: SurveyPregnantDetailComponent;
  let fixture: ComponentFixture<SurveyPregnantDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPregnantDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPregnantDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
