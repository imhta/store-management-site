import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCheckComponent } from './store-check.component';

describe('StoreCheckComponent', () => {
  let component: StoreCheckComponent;
  let fixture: ComponentFixture<StoreCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
