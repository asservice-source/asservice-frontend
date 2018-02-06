import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoertPersonalComponent } from './repoert-personal.component';

describe('RepoertPersonalComponent', () => {
  let component: RepoertPersonalComponent;
  let fixture: ComponentFixture<RepoertPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepoertPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepoertPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
