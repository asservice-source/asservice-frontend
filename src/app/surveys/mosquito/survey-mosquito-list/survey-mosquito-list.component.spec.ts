import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMosquitoListComponent } from './survey-mosquito-list.component';

describe('SurveyMosquitoListComponent', () => {
  let component: SurveyMosquitoListComponent;
  let fixture: ComponentFixture<SurveyMosquitoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyMosquitoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMosquitoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
