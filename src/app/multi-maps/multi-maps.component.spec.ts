import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiMapsComponent } from './multi-maps.component';

describe('MultiMapsComponent', () => {
  let component: MultiMapsComponent;
  let fixture: ComponentFixture<MultiMapsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiMapsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiMapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
