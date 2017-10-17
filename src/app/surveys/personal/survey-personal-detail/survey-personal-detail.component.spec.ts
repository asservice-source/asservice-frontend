import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPersonalDetailComponent } from './personal-detail.component';

describe('SurveyPersonalDetailComponent', () => {
  let component: SurveyPersonalDetailComponent;
  let fixture: ComponentFixture<SurveyPersonalDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPersonalDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPersonalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
