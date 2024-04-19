import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollwersComponent } from './follwers.component';

describe('FollwersComponent', () => {
  let component: FollwersComponent;
  let fixture: ComponentFixture<FollwersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollwersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FollwersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
