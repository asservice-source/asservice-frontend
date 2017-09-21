import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PregnantComponent } from './pregnant.component';

describe('PregnantComponent', () => {
  let component: PregnantComponent;
  let fixture: ComponentFixture<PregnantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PregnantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PregnantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
