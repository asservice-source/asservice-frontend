import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPregnantListComponent } from './survey-pregnant-list.component';

describe('SurveyPregnantListComponent', () => {
  let component: SurveyPregnantListComponent;
  let fixture: ComponentFixture<SurveyPregnantListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPregnantListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPregnantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
