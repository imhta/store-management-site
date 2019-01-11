import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage, AngularFireUploadTask} from '@angular/fire/storage';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, OnDestroy {
  @Input() storeId: string;
  @Output() downloadUrls = new EventEmitter<string[]>();
  @Output() pictureRefs = new EventEmitter<string[]>();

  localDownloadUrls: string[];
  localPictureRefs: string[];

  // Main task
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  constructor(private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.localPictureRefs = [];
    this.localDownloadUrls = [];
  }

  ngOnDestroy(): void {
    this.localPictureRefs = [];
    this.localDownloadUrls = [];
  }

  getDownloadUrls(downloadUrls: string[]) {
    this.downloadUrls.emit(downloadUrls);
  }

  getPictureRefs(pictureRefs: string[]) {
    this.pictureRefs.emit(pictureRefs);
  }

  startUpload(event: FileList) {
    // The File object
    if (event.length < 5 && this.localDownloadUrls.length < 5 && this.localPictureRefs.length < 5) {

      const file = event.item(0);

      // The storage path
      const path = `stores/${this.storeId}/products/${Date.now()}_${file.name}`;

      // Totally optional metadata
      const customMetadata = {app: 'clothx store website'};

      // The main task
      this.task = this.storage.upload(path, file, {customMetadata});
      // Progress monitoring
      this.percentage = this.task.percentageChanges();
      this.snapshot = this.task.snapshotChanges();

      this.task.then((data) => {
        this.localPictureRefs.push(data.ref.fullPath);
        data.ref.getDownloadURL().then((downloadUrl) => {
          this.localDownloadUrls.push(downloadUrl.valueOf());
        }).catch((err) => console.log(err));
      }).then(() => {
        this.getDownloadUrls(this.localDownloadUrls);
        this.getPictureRefs(this.localPictureRefs);
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
      console.log(this.localPictureRefs[i]);
      await this.storage.ref(this.localPictureRefs[i]).delete();
      this.localDownloadUrls.splice(i, 1);
      this.localPictureRefs.splice(i, 1);
      this.getDownloadUrls(this.localDownloadUrls);
      this.getPictureRefs(this.localPictureRefs);
    }

  }

}
