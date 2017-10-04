import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPregnantComponent } from './survey-pregnant.component';

describe('PregnantComponent', () => {
  let component: SurveyPregnantComponent;
  let fixture: ComponentFixture<SurveyPregnantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPregnantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPregnantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
