import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SingleProductModel} from '../../shared/models/product.model';

@Component({
  selector: 'app-store-grid-view',
  templateUrl: './store-grid-view.component.html',
  styleUrls: ['./store-grid-view.component.scss']
})
export class StoreGridViewComponent implements OnInit {
  @Input() allProducts: SingleProductModel[];
  @Output() goToProduct = new EventEmitter();

  constructor() {
  }

  ngOnInit() {

  }

  navigateToProduct(productUid: string) {
    this.goToProduct.emit(productUid);
  }
}
