import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementStaffOsmComponent } from './management-staff-osm.component';

describe('ManagementStaffOsmComponent', () => {
  let component: ManagementStaffOsmComponent;
  let fixture: ComponentFixture<ManagementStaffOsmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementStaffOsmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementStaffOsmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
