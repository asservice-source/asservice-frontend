import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementStaffVillageComponent } from './management-staff-village.component';

describe('ManageStaffVillageComponent', () => {
  let component: ManagementStaffVillageComponent;
  let fixture: ComponentFixture<ManagementStaffVillageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementStaffVillageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementStaffVillageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
