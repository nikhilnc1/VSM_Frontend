import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionalAccentComponent } from './regional-accent.component';

describe('RegionalAccentComponent', () => {
  let component: RegionalAccentComponent;
  let fixture: ComponentFixture<RegionalAccentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegionalAccentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionalAccentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
