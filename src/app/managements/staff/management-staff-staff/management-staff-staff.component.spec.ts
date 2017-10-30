import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementStaffStaffComponent } from './management-staff-staff.component';

describe('ManagementStaffStaffComponent', () => {
  let component: ManagementStaffStaffComponent;
  let fixture: ComponentFixture<ManagementStaffStaffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementStaffStaffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementStaffStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
