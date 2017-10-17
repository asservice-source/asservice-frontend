import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPersonalMemberListComponent } from './survey-personal-member-list.component';

describe('SurveyPersonalMemberListComponent', () => {
  let component: SurveyPersonalMemberListComponent;
  let fixture: ComponentFixture<SurveyPersonalMemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPersonalMemberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPersonalMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
