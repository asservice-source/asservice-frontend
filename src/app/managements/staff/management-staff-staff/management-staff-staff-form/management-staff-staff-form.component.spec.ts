import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementStaffStaffFormComponent } from './management-staff-staff-form.component';

describe('ManagementStaffStaffFormComponent', () => {
  let component: ManagementStaffStaffFormComponent;
  let fixture: ComponentFixture<ManagementStaffStaffFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementStaffStaffFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementStaffStaffFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
