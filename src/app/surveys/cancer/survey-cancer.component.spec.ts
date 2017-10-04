import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCancerComponent } from './survey-cancer.component';

describe('CancerComponent', () => {
  let component: SurveyCancerComponent;
  let fixture: ComponentFixture<SurveyCancerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyCancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyCancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
