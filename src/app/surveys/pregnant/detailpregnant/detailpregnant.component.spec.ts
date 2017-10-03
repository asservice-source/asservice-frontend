import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailpregnantComponent } from './detailpregnant.component';

describe('DetailpregnantComponent', () => {
  let component: DetailpregnantComponent;
  let fixture: ComponentFixture<DetailpregnantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailpregnantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailpregnantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
