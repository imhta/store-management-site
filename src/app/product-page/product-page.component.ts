import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {UserStoreState} from '../shared/models/store.model';
import {GetAllProducts} from '../shared/actions/product.actions';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  @Select('storeState') storeState$: Observable<object>;
  storeDataSubscription: Subscription;
  storeState: UserStoreState;
  product;
  paramsSubscription: Subscription;
  requiredNumber: string;
  storeUid: string;
  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
  }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.product = params;
    });
    this.storeDataSubscription = this.storeState$.subscribe((data) => {
      this.storeState = new UserStoreState(data.valueOf());
      const currentStore = this.storeState.linkedStores[this.storeState.selectedStore];
      this.storeUid = currentStore['storeUid'];
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.storeDataSubscription.unsubscribe();
  }

  generateQr() {
    console.log(this.requiredNumber);
    this.store.dispatch([new Navigate(['generated/qr'], {'number': this.requiredNumber, 'productId': this.product['productUid']})]);
  }

}
