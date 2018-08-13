import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectStorePageComponent } from './select-store-page.component';

describe('SelectStorePageComponent', () => {
  let component: SelectStorePageComponent;
  let fixture: ComponentFixture<SelectStorePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectStorePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectStorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
