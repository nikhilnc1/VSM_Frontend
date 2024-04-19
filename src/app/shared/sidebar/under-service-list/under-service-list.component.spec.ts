import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderServiceListComponent } from './under-service-list.component';

describe('UnderServiceListComponent', () => {
  let component: UnderServiceListComponent;
  let fixture: ComponentFixture<UnderServiceListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderServiceListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderServiceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
