import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFindPersonComponent } from './filter-find-person.component';

describe('FilterFindPersonComponent', () => {
  let component: FilterFindPersonComponent;
  let fixture: ComponentFixture<FilterFindPersonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterFindPersonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFindPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
