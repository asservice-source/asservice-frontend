import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SumpregnantComponent } from './sumpregnant.component';

describe('SumpregnantComponent', () => {
  let component: SumpregnantComponent;
  let fixture: ComponentFixture<SumpregnantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SumpregnantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SumpregnantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
