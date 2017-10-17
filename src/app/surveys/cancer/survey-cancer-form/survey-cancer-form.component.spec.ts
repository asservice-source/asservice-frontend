import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCancerFormComponent } from './survey-cancer-form.component';

describe('SurveyCancerFormComponent', () => {
  let component: SurveyCancerFormComponent;
  let fixture: ComponentFixture<SurveyCancerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyCancerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyCancerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
