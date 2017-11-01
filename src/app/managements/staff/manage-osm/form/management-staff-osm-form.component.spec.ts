import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementStaffOsmFormComponent } from './management-staff-osm-form.component';

describe('ManagementStaffOsmComponent', () => {
  let component: ManagementStaffOsmFormComponent;
  let fixture: ComponentFixture<ManagementStaffOsmFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementStaffOsmFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementStaffOsmFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
