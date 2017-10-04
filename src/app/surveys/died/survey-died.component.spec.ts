import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurverDiedComponent } from './survey-died.component';

describe('DiedComponent', () => {
  let component: SurverDiedComponent;
  let fixture: ComponentFixture<SurverDiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurverDiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurverDiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
