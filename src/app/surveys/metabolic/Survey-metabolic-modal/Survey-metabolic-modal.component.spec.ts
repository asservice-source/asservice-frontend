import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyMetabolicModalComponent } from './survey-metabolic-modal.component';

describe('SurveyMetabolicComponent', () => {
  let component: SurveyMetabolicModalComponent;
  let fixture: ComponentFixture<SurveyMetabolicModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyMetabolicModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyMetabolicModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
