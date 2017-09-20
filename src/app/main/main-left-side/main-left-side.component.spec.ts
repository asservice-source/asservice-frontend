import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLeftSideComponent } from './main-left-side.component';

describe('MainLeftSideComponent', () => {
  let component: MainLeftSideComponent;
  let fixture: ComponentFixture<MainLeftSideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainLeftSideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainLeftSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
