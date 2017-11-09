import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementOsmAreaComponent } from './management-osm-area.component';

describe('ManagementOsmAreaComponent', () => {
  let component: ManagementOsmAreaComponent;
  let fixture: ComponentFixture<ManagementOsmAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementOsmAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementOsmAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
