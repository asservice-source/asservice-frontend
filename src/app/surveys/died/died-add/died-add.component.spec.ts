import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiedAddComponent } from './died-add.component';

describe('DiedAddComponent', () => {
  let component: DiedAddComponent;
  let fixture: ComponentFixture<DiedAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiedAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiedAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
