import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngxs/store';
import {LoadingFalse} from '../../state/loading.state';
import {ProductFounded} from '../../actions/product.actions';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient, private store: Store) { }
  searchForProduct(searchQuery) {
    this.http
      .post('https://us-central1-clothxnet.cloudfunctions.net/algoliaSearch/store_search_all', searchQuery)
      .subscribe((res: any[]) => this.store.dispatch([new ProductFounded(res)]));
  }
}
