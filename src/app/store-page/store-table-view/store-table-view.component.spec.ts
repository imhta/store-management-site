import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreTableViewComponent } from './store-table-view.component';

describe('StoreTableViewComponent', () => {
  let component: StoreTableViewComponent;
  let fixture: ComponentFixture<StoreTableViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreTableViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreTableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
