import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceDoneListComponent } from './service-done-list.component';

describe('ServiceDoneListComponent', () => {
  let component: ServiceDoneListComponent;
  let fixture: ComponentFixture<ServiceDoneListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceDoneListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceDoneListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
