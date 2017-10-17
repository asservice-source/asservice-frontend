import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPersonalHomeListComponent } from './survey-personal-home-list.component';

describe('SurveyPersonalHomeListComponent', () => {
  let component: SurveyPersonalHomeListComponent;
  let fixture: ComponentFixture<SurveyPersonalHomeListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPersonalHomeListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPersonalHomeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
