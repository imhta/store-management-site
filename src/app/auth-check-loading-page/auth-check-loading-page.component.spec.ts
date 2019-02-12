import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCheckLoadingPageComponent } from './auth-check-loading-page.component';

describe('AuthCheckLoadingPageComponent', () => {
  let component: AuthCheckLoadingPageComponent;
  let fixture: ComponentFixture<AuthCheckLoadingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthCheckLoadingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCheckLoadingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
