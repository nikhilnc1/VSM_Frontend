import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundbiteComponent } from './soundbite.component';

describe('SoundbiteComponent', () => {
  let component: SoundbiteComponent;
  let fixture: ComponentFixture<SoundbiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundbiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundbiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
