import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterHeadMosquitoComponent } from './filter-head-mosquito.component';

describe('FilterHeadMosquitoComponent', () => {
  let component: FilterHeadMosquitoComponent;
  let fixture: ComponentFixture<FilterHeadMosquitoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterHeadMosquitoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterHeadMosquitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
