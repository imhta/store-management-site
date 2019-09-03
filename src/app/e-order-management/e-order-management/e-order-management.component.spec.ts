import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EOrderManagementComponent } from './e-order-management.component';

describe('EOrderManagementComponent', () => {
  let component: EOrderManagementComponent;
  let fixture: ComponentFixture<EOrderManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EOrderManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EOrderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
