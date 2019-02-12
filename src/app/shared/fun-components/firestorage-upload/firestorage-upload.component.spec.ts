import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirestorageUploadComponent } from './firestorage-upload.component';

describe('FirestorageUploadComponent', () => {
  let component: FirestorageUploadComponent;
  let fixture: ComponentFixture<FirestorageUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirestorageUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirestorageUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
