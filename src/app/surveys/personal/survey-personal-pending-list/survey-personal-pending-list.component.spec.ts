import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPersonalPendingListComponent } from './survey-personal-pending-list.component';

describe('SurveyPersonalPendingListComponent', () => {
  let component: SurveyPersonalPendingListComponent;
  let fixture: ComponentFixture<SurveyPersonalPendingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPersonalPendingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPersonalPendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
