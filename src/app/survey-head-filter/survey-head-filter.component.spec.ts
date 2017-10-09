import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyHeadFilterComponent } from './survey-head-filter.component';

describe('SurveyHeadFilterComponent', () => {
  let component: SurveyHeadFilterComponent;
  let fixture: ComponentFixture<SurveyHeadFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyHeadFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyHeadFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
