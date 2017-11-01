import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementStaffStaffListComponent } from './management-staff-staff-list.component';

describe('ManagementStaffStaffComponent', () => {
  let component: ManagementStaffStaffListComponent;
  let fixture: ComponentFixture<ManagementStaffStaffListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementStaffStaffListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementStaffStaffListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
