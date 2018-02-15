import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveysMosquitoPendingListComponent } from './surveys-mosquito-pending-list.component';

describe('SurveysMosquitoPendingListComponent', () => {
  let component: SurveysMosquitoPendingListComponent;
  let fixture: ComponentFixture<SurveysMosquitoPendingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveysMosquitoPendingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveysMosquitoPendingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
