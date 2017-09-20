import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainControlSidebarComponent } from './main-control-sidebar.component';

describe('MainControlSidebarComponent', () => {
  let component: MainControlSidebarComponent;
  let fixture: ComponentFixture<MainControlSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainControlSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainControlSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
