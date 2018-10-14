import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserStoreState} from '../shared/models/store.model';
import {GetAllProducts} from '../shared/actions/product.actions';
import {Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {CartProduct, InvoiceModel} from '../shared/models/invoice.model';
import {AuthState} from '../shared/state/auth.state';
import {LoadingTrue} from '../shared/state/loading.state';
import {SaveInvoice} from '../shared/actions/invoice.actions';

@Component({
  selector: 'app-billing-page',
  templateUrl: './sell-page.component.html',
  styleUrls: ['./sell-page.component.css']
})
export class SellPageComponent implements OnInit, OnDestroy {
  @Select('storeState') storeState$: Observable<object>;
  @Select('allProducts') allProducts$: Observable<object[]>;
  @Select(AuthState.uid) uid$: Observable<string>;
  storeDataSubscription: Subscription;
  storeState: UserStoreState;
  currentStore;
  allProducts: any[];
  typeOfPayment = ['Cash', 'Card', 'Cash & Card'];
  prn: string;
  cartProducts: CartProduct[] = [];
  invoice = new InvoiceModel();


  constructor(private store: Store) {
    this.invoice.typeOfPayment = 'Cash';
  }

  ngOnInit() {
    this.uid$.subscribe((uid) => this.invoice.billedBy = uid);
    this.refreshAllProduct();
    this.invoice.storeUid = this.currentStore['storeUid'];
  }

  ngOnDestroy() {
    this.storeDataSubscription.unsubscribe();
  }

  refreshAllProduct() {

    this.storeDataSubscription = this.storeState$.subscribe((data) => {
      this.storeState = new UserStoreState(data.valueOf());
      this.currentStore = this.storeState.linkedStores[this.storeState.selectedStore];
      this.store.dispatch([new GetAllProducts(this.currentStore['storeUid'])]);
    });
    this.allProducts$.subscribe((data: any[]) => {
      this.allProducts = data;
      console.log(this.allProducts);
    });
  }

  getProduct(product: string) {
    this.prn = product.split('/')[1];
  }

  addToCart(prn) {


    const resultProduct = this.findProduct(prn);
    const cartProduct = new CartProduct();
    cartProduct.differentSizes = resultProduct[0]['ssp'];
    const lengthOfAvailableSize = cartProduct.differentSizes.length;
    if (lengthOfAvailableSize > 0) {
      if (parseFloat(resultProduct[0]['stock']) === 0 || parseFloat(resultProduct[0]['stock']) < 0) {
        console.log('out of stock');
      } else {
        // default selection of size
        cartProduct.selectedSize = 0;
        cartProduct.size = cartProduct.differentSizes[cartProduct.selectedSize]['size'];
        cartProduct.singleUnitPrice = parseFloat(cartProduct.differentSizes[cartProduct.selectedSize]['price']);
        cartProduct.maxQuantity = parseFloat(cartProduct.differentSizes[cartProduct.selectedSize]['stock']);

        console.log(resultProduct);
        cartProduct.prn = resultProduct[0]['prn'];
        cartProduct.typeOfProduct = resultProduct[0]['category'];
        cartProduct.productName = resultProduct[0]['productName'];
        cartProduct.inclusiveAllTaxes = resultProduct[0]['inclusiveAllTaxes'];
        switch (resultProduct[0]['taxType']) {
          case 'footwear': {
            cartProduct.singleUnitPrice < 500 ? cartProduct.taxInPercentage = 5 : cartProduct.taxInPercentage = 18;
            break;
          }
          case 'textile': {
            cartProduct.singleUnitPrice < 1000 ? cartProduct.taxInPercentage = 5 : cartProduct.taxInPercentage = 12;
            break;
          }
          case 'other': {
            cartProduct.taxInPercentage = resultProduct[0]['otherTax'];
            break;
          }
          default: {
            cartProduct.singleUnitPrice < 1000 ? cartProduct.taxInPercentage = 5 : cartProduct.taxInPercentage = 12;
            break;
          }

        }

        cartProduct.totalQuantity = 1;
        this.calculateTotal(cartProduct);
        this.cartProducts.push(cartProduct);
        this.calculateInvoiceTotal();
        console.log(this.invoice);
      }

    } else {
      return console.log('Product does not exits');
    }

    this.refreshAllProduct();

  }

  selectSize(cartProduct: CartProduct, index: number) {
    cartProduct.selectedSize = index;
    cartProduct.size = cartProduct.differentSizes[cartProduct.selectedSize]['size'];
    cartProduct.singleUnitPrice = parseFloat(cartProduct.differentSizes[cartProduct.selectedSize]['price']);
    cartProduct.maxQuantity = parseFloat(cartProduct.differentSizes[cartProduct.selectedSize]['stock']);
    this.calculateTotal(cartProduct);
  }

  calculateTotal(product) {
    product.calculateProductTotal();
    this.calculateInvoiceTotal();
  }

  calculateInvoiceTotal() {
    this.invoice.cartProductsToJson(this.cartProducts);
    console.log(this.invoice);
  }

// this function for check whether product exits, disabled for add same product of multiple size
  // checkProduct(prn) {
  //   return this.cartProducts.filter(product => product.prn === prn).length === 0;
  // }

  findProduct(prn) {
    return this.allProducts.filter(product => product['prn'] === prn);
  }

  selectPayment(index) {
    this.invoice.typeOfPayment = index;

  }

  deleteProductFromCart(i) {
    console.log(i, this.cartProducts.length);

    if (i !== -1) {
      this.cartProducts.splice(i, 1);
      this.calculateInvoiceTotal();
      console.log(this.cartProducts);
    }
  }

  saveInvoice() {
    this.calculateInvoiceTotal();
    this.store.dispatch([new LoadingTrue(), new SaveInvoice(this.invoice)]);
  }
}
