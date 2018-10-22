import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {StorePicsUploadComponent} from './store-pics-upload.component';

describe('StorePicsUploadComponent', () => {
  let component: StorePicsUploadComponent;
  let fixture: ComponentFixture<StorePicsUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StorePicsUploadComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorePicsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
