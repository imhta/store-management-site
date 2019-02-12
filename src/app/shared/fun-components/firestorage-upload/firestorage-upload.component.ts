import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';

@Component({
  selector: 'app-firestorage-upload',
  templateUrl: './firestorage-upload.component.html',
  styleUrls: ['./firestorage-upload.component.css']
})
export class FirestorageUploadComponent implements OnInit, OnDestroy {
  @Input() storeId: string;
  @Input() inData: { localDownloadUrls: string[], localPictureRefs: string[] };
  @Output() outData = new EventEmitter<object>();
  data: { localDownloadUrls: string[], localPictureRefs: string[] } = {localDownloadUrls: [], localPictureRefs: []};


  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  constructor(private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    console.log(this.inData);
    this.data.localPictureRefs = this.inData.localPictureRefs.length > 0 ? this.inData.localPictureRefs : [];
    this.data.localDownloadUrls = this.inData.localDownloadUrls.length > 0 ? this.inData.localDownloadUrls : [];
  }

  ngOnDestroy(): void {
    this.data.localPictureRefs = [];
    this.data.localDownloadUrls = [];
  }

  sentData(data: object) {
    this.outData.emit(data);
  }

  startUpload(event: FileList) {
    // The File object
    if (event.length < 5 && this.data.localDownloadUrls.length < 5) {

      const file = event.item(0);

      // The storage path
      const path = `stores/${this.storeId}/store-pics/${Date.now()}_${file.name}`;

      // Totally optional metadata
      const customMetadata = {app: 'clothx store website'};

      // The main task
      this.task = this.storage.upload(path, file, {customMetadata});
      // Progress monitoring
      this.percentage = this.task.percentageChanges();
      this.snapshot = this.task.snapshotChanges();

      this.task.then(async (data) => {
        this.data.localPictureRefs.push(data.ref.fullPath);
        await data.ref.getDownloadURL().then((downloadUrl) => {
          this.data.localDownloadUrls.push(downloadUrl.valueOf());
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
  async removePicture(i: number) {
    if (i !== -1) {
      await this.storage.ref(this.data.localPictureRefs[i]).delete();
      this.data.localDownloadUrls.splice(i, 1);
      this.data.localPictureRefs.splice(i, 1);
      this.sentData(this.data);
    }

  }

}
