import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterPersonalComponent } from './filter-personal.component';

describe('FilterPersonalComponent', () => {
  let component: FilterPersonalComponent;
  let fixture: ComponentFixture<FilterPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
