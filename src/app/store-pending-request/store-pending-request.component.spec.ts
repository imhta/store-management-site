import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePendingRequestComponent } from './store-pending-request.component';

describe('StorePendingRequestComponent', () => {
  let component: StorePendingRequestComponent;
  let fixture: ComponentFixture<StorePendingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorePendingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePendingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
