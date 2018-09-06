import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedStoreComponent } from './linked-store.component';

describe('LinkedStoreComponent', () => {
  let component: LinkedStoreComponent;
  let fixture: ComponentFixture<LinkedStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
