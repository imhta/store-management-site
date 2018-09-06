import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupStorePageComponent } from './setup-store-page.component';

describe('SetupStorePageComponent', () => {
  let component: SetupStorePageComponent;
  let fixture: ComponentFixture<SetupStorePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupStorePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupStorePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
