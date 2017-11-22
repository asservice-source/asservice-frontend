import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementHomeFormComponent } from './management-home-form.component';

describe('ManagementOsmAreaFormComponent', () => {
  let component: ManagementHomeFormComponent;
  let fixture: ComponentFixture<ManagementHomeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementHomeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementHomeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
