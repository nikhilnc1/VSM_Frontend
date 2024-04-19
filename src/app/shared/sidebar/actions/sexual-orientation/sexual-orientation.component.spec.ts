import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SexualOrientationComponent } from './sexual-orientation.component';

describe('SexualOrientationComponent', () => {
  let component: SexualOrientationComponent;
  let fixture: ComponentFixture<SexualOrientationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SexualOrientationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SexualOrientationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
