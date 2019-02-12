import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class GetConfigService {

  constructor(private db: AngularFireDatabase) { }

  getTypeOfStores() {
    return this.db.object('config/typesOfStores').valueChanges();
  }
}
