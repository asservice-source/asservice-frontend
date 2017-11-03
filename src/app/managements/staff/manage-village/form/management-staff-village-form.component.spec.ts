import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementStaffVillageFormComponent } from './management-staff-village-form.component';

describe('ManageStaffVillageComponent', () => {
  let component: ManagementStaffVillageFormComponent;
  let fixture: ComponentFixture<ManagementStaffVillageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementStaffVillageFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementStaffVillageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
