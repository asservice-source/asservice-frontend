import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementStaffUserFormComponent } from './management-staff-user-form.component';

describe('ManagementStaffOsmComponent', () => {
  let component: ManagementStaffUserFormComponent;
  let fixture: ComponentFixture<ManagementStaffUserFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementStaffUserFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementStaffUserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
