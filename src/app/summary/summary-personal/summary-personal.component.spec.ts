import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SummarytPersonalComponent } from './summary-personal.component';

describe('SummarytPersonalComponent', () => {
  let component: SummarytPersonalComponent;
  let fixture: ComponentFixture<SummarytPersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SummarytPersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SummarytPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
