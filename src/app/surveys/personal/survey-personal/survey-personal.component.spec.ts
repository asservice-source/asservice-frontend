import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyPersonalComponent } from './personal.component';

describe('SurveyPersonalComponent', () => {
  let component: SurveyPersonalComponent;
  let fixture: ComponentFixture<SurveyPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
