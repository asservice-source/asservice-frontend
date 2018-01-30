import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCancerHistoryComponent } from './survey-cancer-history.component';

describe('SurveyCancerHistoryComponent', () => {
  let component: SurveyCancerHistoryComponent;
  let fixture: ComponentFixture<SurveyCancerHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyCancerHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyCancerHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
