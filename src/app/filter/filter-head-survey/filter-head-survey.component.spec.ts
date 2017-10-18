import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterHeadSurveyComponent } from './filter-head-survey.component';

describe('FilterHeadSurveyComponent', () => {
  let component: FilterHeadSurveyComponent;
  let fixture: ComponentFixture<FilterHeadSurveyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilterHeadSurveyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterHeadSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
