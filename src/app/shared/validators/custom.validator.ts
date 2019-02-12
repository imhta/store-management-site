import { AbstractControl } from '@angular/forms';
import {debounceTime, map, take} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore/firestore';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomValidator {

  static usn(afs: AngularFirestore) {
    return (control: AbstractControl) => {

      const usn = control.value.toLowerCase();

      return afs.collection('stores', ref => ref.where('usn', '==', usn) )

        .valueChanges().pipe(
          debounceTime(500),
          take(1),
          map(arr => arr.length  ? { usnAvailable: false } : null  ),
        );
    };
  }

}
