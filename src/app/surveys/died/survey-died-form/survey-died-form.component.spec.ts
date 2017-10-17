import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyDiedFormComponent } from './survey-died-form.component';

describe('SurveyDiedFormComponent', () => {
  let component: SurveyDiedFormComponent;
  let fixture: ComponentFixture<SurveyDiedFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyDiedFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyDiedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
