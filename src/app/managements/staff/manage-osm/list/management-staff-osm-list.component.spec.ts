import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementStaffOsmListComponent } from './management-staff-osm-list.component';

describe('ManagementStaffOsmComponent', () => {
  let component: ManagementStaffOsmListComponent;
  let fixture: ComponentFixture<ManagementStaffOsmListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementStaffOsmListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementStaffOsmListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
