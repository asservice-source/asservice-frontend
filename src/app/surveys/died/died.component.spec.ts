import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiedComponent } from './died.component';

describe('DiedComponent', () => {
  let component: DiedComponent;
  let fixture: ComponentFixture<DiedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
