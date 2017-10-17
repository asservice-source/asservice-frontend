import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPersonalDetailModalComponent } from './survey-personal-detail-modal.component';

describe('SurveyPersonalDetailModalComponent', () => {
  let component: SurveyPersonalDetailModalComponent;
  let fixture: ComponentFixture<SurveyPersonalDetailModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPersonalDetailModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPersonalDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
