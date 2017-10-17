import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SurverDiedListComponent } from './survey-died-list.component';

describe('SurverDiedListComponent', () => {
  let component: SurverDiedListComponent;
  let fixture: ComponentFixture<SurverDiedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SurverDiedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SurverDiedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
