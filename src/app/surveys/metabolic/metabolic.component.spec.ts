import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetabolicComponent } from './metabolic.component';

describe('MetabolicComponent', () => {
  let component: MetabolicComponent;
  let fixture: ComponentFixture<MetabolicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetabolicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetabolicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
