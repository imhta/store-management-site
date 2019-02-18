import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversalMicroAddDialogComponent } from './universal-micro-add-dialog.component';

describe('UniversalMicroAddDialogComponent', () => {
  let component: UniversalMicroAddDialogComponent;
  let fixture: ComponentFixture<UniversalMicroAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniversalMicroAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniversalMicroAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
