import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyCancerListComponent } from './survey-cancer-list.component';

describe('SurveyCancerListComponent', () => {
  let component: SurveyCancerListComponent;
  let fixture: ComponentFixture<SurveyCancerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurveyCancerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyCancerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
