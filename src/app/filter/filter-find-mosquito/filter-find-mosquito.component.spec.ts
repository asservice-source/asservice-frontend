import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterFindMosquitoComponent } from './filter-find-mosquito.component';

describe('FilterFindMosquitoComponent', () => {
  let component: FilterFindMosquitoComponent;
  let fixture: ComponentFixture<FilterFindMosquitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterFindMosquitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterFindMosquitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
