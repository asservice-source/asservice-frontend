import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementHomeComponent } from './management-home.component';

describe('ManagementOsmAreaComponent', () => {
  let component: ManagementHomeComponent;
  let fixture: ComponentFixture<ManagementHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
