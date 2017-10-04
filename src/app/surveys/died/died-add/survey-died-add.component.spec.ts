import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyDiedAddComponent } from './survey-died-add.component';

describe('DiedAddComponent', () => {
  let component: SurveyDiedAddComponent;
  let fixture: ComponentFixture<SurveyDiedAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyDiedAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyDiedAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
