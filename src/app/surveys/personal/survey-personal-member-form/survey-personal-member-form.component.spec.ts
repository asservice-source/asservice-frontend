import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPersonalMemberFormComponent } from './survey-personal-member-form.component';

describe('SurveyPersonalMemberFormComponent', () => {
  let component: SurveyPersonalMemberFormComponent;
  let fixture: ComponentFixture<SurveyPersonalMemberFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPersonalMemberFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPersonalMemberFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
