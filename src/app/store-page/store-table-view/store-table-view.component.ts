import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SingleProductModel} from '../../shared/models/product.model';

@Component({
  selector: 'app-store-table-view',
  templateUrl: './store-table-view.component.html',
  styleUrls: ['./store-table-view.component.css']
})
export class StoreTableViewComponent implements OnInit {
  @Input() allProducts: SingleProductModel[];
  @Output() goToProduct = new EventEmitter();
  @Output() goToAddProduct = new EventEmitter();
  constructor() {
  }

  ngOnInit() {

  }
  navigateToAddProduct() {
    this.goToAddProduct.emit();
  }
  navigateToProduct(productUid: string) {
    this.goToProduct.emit(productUid);
  }
}
