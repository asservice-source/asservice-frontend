import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementStaffUserListComponent } from './management-staff-user-list.component';

describe('ManagementStaffOsmComponent', () => {
  let component: ManagementStaffUserListComponent;
  let fixture: ComponentFixture<ManagementStaffUserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementStaffUserListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementStaffUserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
