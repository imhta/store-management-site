import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreGridViewComponent } from './store-grid-view.component';

describe('StoreGridViewComponent', () => {
  let component: StoreGridViewComponent;
  let fixture: ComponentFixture<StoreGridViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreGridViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
