import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngxs/store';
import {ProductFounded} from '../../actions/product.actions';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private store: Store) { }
  searchForProduct(searchQuery) {
    this.http
      .post(`https://us-central1-${environment.firebase.projectId}..cloudfunctions.net/algoliaSearch/search/store_all`, searchQuery)
      .subscribe((res: any[]) => this.store.dispatch([new ProductFounded(res)]));
  }
}
