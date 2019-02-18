import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Store} from '@ngxs/store';
import {OpenSnackBarWithoutCustomAction} from '../../../shared/state/app-general.state';

@Injectable({
  providedIn: 'root'
})
export class UniversalMicroAddService {

  constructor(private db: AngularFirestore, private store: Store) {
  }

  addProductMicroConfig(storeId: string, type: string, src: string, name: string, taxInPercentage?: number) {
    this.checkIsMicroExit(storeId, type, src, name).then((data) => {
      if (data) {
        if (src === 'taxes') {
          this.db.collection(`stores/${storeId}/${src}`)
            .add({name: name, taxInPercentage: taxInPercentage})
            .then(() => this.store.dispatch([new OpenSnackBarWithoutCustomAction(`${name} added to ${type}`)]))
            .catch((err) => {
                this.store.dispatch([new OpenSnackBarWithoutCustomAction(`ERROR in adding ${name}`)]);
                console.log(err);
              }
            );
        } else {
          this.db.collection(`stores/${storeId}/${src}`)
            .add({name: name})
            .then(() => this.store.dispatch([new OpenSnackBarWithoutCustomAction(`${name} added to ${type}`)]))
            .catch((err) => {
                this.store.dispatch([new OpenSnackBarWithoutCustomAction(`ERROR in adding ${name}`)]);
                console.log(err);
              }
            );
        }

      } else {
        this.store.dispatch([new OpenSnackBarWithoutCustomAction(`Already  ${name} exits in ${type} `)]);
      }
    });

  }

  async checkIsMicroExit(storeId: string, type: string, src: string, name: string) {

    return this.db.collection(`stores/${storeId}/${src}`)
      .ref
      .where('name', '==', name)
      .get()
      .then((data) => data.size === 0)
      .catch(() => this.store.dispatch([new OpenSnackBarWithoutCustomAction(`ERROR in adding ${name}`)]));
  }
}
