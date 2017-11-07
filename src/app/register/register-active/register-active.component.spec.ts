import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterActiveComponent } from './register-active.component';

describe('RegisterActiveComponent', () => {
  let component: RegisterActiveComponent;
  let fixture: ComponentFixture<RegisterActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
