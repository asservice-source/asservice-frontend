import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancerComponent } from './cancer.component';

describe('CancerComponent', () => {
  let component: CancerComponent;
  let fixture: ComponentFixture<CancerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
