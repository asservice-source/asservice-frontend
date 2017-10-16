import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiindPersonMemberListComponent } from './member-list.component';

describe('MemberListComponent', () => {
  let component: FiindPersonMemberListComponent;
  let fixture: ComponentFixture<FiindPersonMemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiindPersonMemberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiindPersonMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
