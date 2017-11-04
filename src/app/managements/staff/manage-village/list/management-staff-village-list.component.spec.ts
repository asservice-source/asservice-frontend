import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementStaffVillageListComponent } from './management-staff-village-list.component';

describe('ManageStaffVillageComponent', () => {
  let component: ManagementStaffVillageListComponent;
  let fixture: ComponentFixture<ManagementStaffVillageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementStaffVillageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementStaffVillageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
