import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
@Component({
  selector: 'app-store-check',
  templateUrl: './store-check.component.html',
  styleUrls: ['./store-check.component.css']
})
export class StoreCheckComponent implements OnInit {
coRef: AngularFirestoreCollection<any>;
sid = new FormControl('');
  constructor(private db: AngularFirestore ) { }

  ngOnInit() {
    this.coRef = this.db.collection('stores');
  }

  checkSid (sid) {
    this.coRef.doc(sid).ref.get().then((data) => {
      console.log(data.exists);
    });

  }
}
