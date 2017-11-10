import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementOsmAreaFormComponent } from './management-osm-area-form.component';

describe('ManagementOsmAreaFormComponent', () => {
  let component: ManagementOsmAreaFormComponent;
  let fixture: ComponentFixture<ManagementOsmAreaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementOsmAreaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementOsmAreaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
