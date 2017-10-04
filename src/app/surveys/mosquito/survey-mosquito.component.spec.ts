import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMosquitoComponent } from './survey-mosquito.component';

describe('MosquitoComponent', () => {
  let component: SurveyMosquitoComponent;
  let fixture: ComponentFixture<SurveyMosquitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyMosquitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMosquitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
