import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelTypeComponent } from './model-type.component';

describe('ModelTypeComponent', () => {
  let component: ModelTypeComponent;
  let fixture: ComponentFixture<ModelTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModelTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
