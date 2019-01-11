import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';

@Component({
  selector: 'app-logo-upload',
  templateUrl: './logo-upload.component.html',
  styleUrls: ['./logo-upload.component.scss']
})
export class LogoUploadComponent implements OnInit, OnDestroy {

  @Input() storeId: string;
  @Input() inData: { localDownloadUrl: string, localPictureRef: string };
  @Output() outData = new EventEmitter<object>();
  data: { localDownloadUrl: string, localPictureRef: string } = {localDownloadUrl: '', localPictureRef: ''};

  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  constructor(private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    console.log(this.inData);
    this.data.localPictureRef = this.inData.localPictureRef ? this.inData.localPictureRef : '';
    this.data.localDownloadUrl = this.inData.localDownloadUrl ? this.inData.localDownloadUrl : '';

  }

  ngOnDestroy(): void {
    console.log(this.inData);
    this.data.localPictureRef = '';
    this.data.localDownloadUrl = '';
  }

  sentData(data: object) {
    this.outData.emit(data);
  }


  startUpload(event: FileList) {
    // The File object
    if (event.length === 1) {

      const file = event.item(0);

      // The storage path
      const path = `stores/${this.storeId}/logo`;

      // Totally optional metadata
      const customMetadata = {app: 'clothx store website'};

      // The main task
      this.task = this.storage.upload(path, file, {customMetadata});
      // Progress monitoring
      this.percentage = this.task.percentageChanges();
      this.snapshot = this.task.snapshotChanges();

      this.task.then(async (data) => {
        this.data.localPictureRef = data.ref.fullPath;
        await data.ref.getDownloadURL().then((downloadUrl) => {
          this.data.localDownloadUrl = downloadUrl.valueOf();
        }).catch((err) => console.log(err));
      }).then(() => {
        this.sentData(this.data);
      });


    } else {
      console.log('upload limit exceeded');
    }


  }

  // // Determines if the upload task is active
  // isActive(snapshot) {
  //   return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  // }
  async removePicture() {
    await this.storage.ref(this.data.localPictureRef).delete();
    this.data.localDownloadUrl = '';
    this.data.localPictureRef = '';
    this.sentData(this.data);


  }
}
