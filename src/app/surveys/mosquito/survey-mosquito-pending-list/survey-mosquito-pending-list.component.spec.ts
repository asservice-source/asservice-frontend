import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMosquitoPendingListComponent } from './survey-mosquito-pending-list.component';

describe('SurveysMosquitoPendingListComponent', () => {
  let component: SurveyMosquitoPendingListComponent;
  let fixture: ComponentFixture<SurveyMosquitoPendingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyMosquitoPendingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMosquitoPendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
