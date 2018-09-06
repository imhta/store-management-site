import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStorePageComponent } from './manage-store-page.component';

describe('ManageStorePageComponent', () => {
  let component: ManageStorePageComponent;
  let fixture: ComponentFixture<ManageStorePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageStorePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageStorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
