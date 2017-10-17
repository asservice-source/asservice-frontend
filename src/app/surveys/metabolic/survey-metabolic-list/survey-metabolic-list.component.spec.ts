import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMetabolicListComponent } from './survey-metabolic-list.component';

describe('SurveyMetabolicListComponent', () => {
  let component: SurveyMetabolicListComponent;
  let fixture: ComponentFixture<SurveyMetabolicListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyMetabolicListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMetabolicListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
