import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPersonalHomeFormComponent } from './survey-personal-home-form.component';

describe('SurveyPersonalHomeFormComponent', () => {
  let component: SurveyPersonalHomeFormComponent;
  let fixture: ComponentFixture<SurveyPersonalHomeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPersonalHomeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPersonalHomeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
