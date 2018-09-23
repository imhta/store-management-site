import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {DeleteAProduct} from '../shared/actions/product.actions';


@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product;
  paramsSubscription: Subscription;
  requiredNumber: string;
  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
  }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.product = params;
    });

  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  generateQr() {
    console.log(this.requiredNumber);
    this.store.dispatch([new Navigate(['generated/qr'], {'number': this.requiredNumber, 'productId': this.product['productUid']})]);
  }
  deleteProduct() {
    return this.store.dispatch([new DeleteAProduct(this.product['productUid'])]);
  }

}
