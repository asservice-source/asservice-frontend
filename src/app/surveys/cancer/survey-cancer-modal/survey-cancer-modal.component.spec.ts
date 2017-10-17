import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCancerModalComponent } from './survey-cancer-modal.component';

describe('SurveyCancerModalComponent', () => {
  let component: SurveyCancerModalComponent;
  let fixture: ComponentFixture<SurveyCancerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyCancerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyCancerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
