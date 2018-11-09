import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscountsManagerComponent } from './discounts-manager.component';

describe('DiscountsManagerComponent', () => {
  let component: DiscountsManagerComponent;
  let fixture: ComponentFixture<DiscountsManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscountsManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscountsManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
