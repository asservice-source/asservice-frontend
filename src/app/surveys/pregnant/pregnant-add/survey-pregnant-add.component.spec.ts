import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPregnantAddComponent } from './survey-pregnant-add.component';

describe('AddpregnantComponent', () => {
  let component: SurveyPregnantAddComponent;
  let fixture: ComponentFixture<SurveyPregnantAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPregnantAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPregnantAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
