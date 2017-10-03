import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpregnantComponent } from './addpregnant.component';

describe('AddpregnantComponent', () => {
  let component: AddpregnantComponent;
  let fixture: ComponentFixture<AddpregnantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddpregnantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpregnantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
