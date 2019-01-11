import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserStoreState} from '../shared/models/store.model';
import {Actions, ofActionDispatched, Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {CartProduct, InvoiceModel} from '../shared/models/invoice.model';
import {AuthState} from '../shared/state/auth.state';
import {LoadingTrue} from '../shared/state/loading.state';
import {SaveInvoice} from '../shared/actions/invoice.actions';
import {debounceTime, distinctUntilChanged, first, map} from 'rxjs/operators';
import {SingleProductModel} from '../shared/models/product.model';
import {
  CheckCustomerExitsOrNot,
  CheckCustomerNewToStore,
  CustomerExits,
  CustomerNotExits,
  OldCustomerOfStore
} from '../shared/actions/customers.actions';
import {GetAllDiscounts, GotAllDiscountsSuccessfully} from '../shared/actions/discount.actions';
import {DiscountModel} from '../shared/models/discount.model';

@Component({
  selector: 'app-billing-page',
  templateUrl: './sales-page.component.html',
  styleUrls: ['./sales-page.component.css'],

})
export class SalesPageComponent implements OnInit, OnDestroy {
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
  outStockedProducts = [];
  rewardDetail = {};
  allDiscounts: DiscountModel[];
  selectedDiscountIndex: number;
  isOldCustomer = false;
  customerNotExit = false;
  isErrorInSavingInvoice = false;
  isFc = true;
  screenWidth;
  constructor(private store: Store, private action$: Actions) {
    this.invoice.typeOfPayment = 'Cash';
   this.screenWidth = window.screen.width;
  }

  prnSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.allProducts.map(v => v['prn']).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).reverse().slice(0, 10))
    );

  ngOnInit() {
    this.uid$.subscribe((uid) => this.invoice.billedBy = uid);
    this.refreshAllProduct();
    this.action$
      .pipe(ofActionDispatched(GotAllDiscountsSuccessfully)).subscribe(({allDiscount}) => this.allDiscounts = allDiscount);
    this.invoice.storeUid = this.currentStore.storeUid;
    this.invoice.hasNoGstNumber = this.currentStore.hasNoGstNumber;
    this.invoice.gstNumber = this.currentStore.gstNumber;
  }

  ngOnDestroy() {
    this.storeDataSubscription.unsubscribe();

  }

  refreshAllProduct() {

    this.storeDataSubscription = this.storeState$.subscribe((data) => {
      this.storeState = new UserStoreState(data.valueOf());
      this.currentStore = this.storeState.linkedStores[this.storeState.selectedStore];
      this.store.dispatch([new GetAllDiscounts(this.currentStore.storeUid)]);
    });
    this.allProducts$.subscribe((data: any[]) => {
      this.allProducts = data;
    });
  }

  addDiscount(index) {
    if (!this.invoice.isDiscountApplied && this.cartProducts.length > 0) {
      this.selectedDiscountIndex = index;
      this.invoice.discount = this.allDiscounts[index];
      this.invoice.isDiscountApplied = true;
      if (this.allDiscounts[index].amountType === 'percentage') {
        this.invoice.discountPrice =
          this.invoice.totalPrice - (this.invoice.totalPrice * (parseFloat(this.allDiscounts[index].amount) / 100));
      } else {
        this.invoice.discountPrice = this.invoice.totalPrice - parseFloat(this.allDiscounts[index].amount);
      }
    } else {
      this.removeDiscount();
    }
  }

  removeDiscount() {
    this.invoice.discount = {};
    this.invoice.isDiscountApplied = false;
    this.invoice.discountPrice = 0;
    this.selectedDiscountIndex = null;
  }

  phoneNoChanged(phoneNo) {
    if (String(phoneNo).length === 10) {
      this.store.dispatch([new LoadingTrue(), new CheckCustomerExitsOrNot(phoneNo)]);
      this.action$.pipe(ofActionDispatched(CustomerExits), first()).subscribe(({customerName}) => {
        if (customerName === '') {
          this.customerNotExit = true;
        }
        this.invoice.customerName = customerName;
        this.store.dispatch([new LoadingTrue(), new CheckCustomerNewToStore(phoneNo, this.currentStore.storeUid)]);
      });
      this.action$.pipe(ofActionDispatched(CustomerNotExits), first()).subscribe(() => this.customerNotExit = true);
      this.action$.pipe(ofActionDispatched(OldCustomerOfStore), first()).subscribe(({rewardDetail}) => {
        this.isOldCustomer = true;
        this.rewardDetail = rewardDetail;
      });
    } else {
      this.invoice.customerName = '';
      this.customerNotExit = false;
      this.isOldCustomer = false;
      this.rewardDetail = {};
    }
  }

  getProduct(product: string) {
    this.prn = product.split('/')[1];
  }

  checkWhetherOutOfStock(variants) {
    for (const variant of variants) {
      if (parseFloat(String(variant.stock)) === 0 || parseFloat(String(variant.stock)) < 0) {
        return true;
      }
    }
    return false;
  }

  addToCart(prn) {
    const resultProduct: SingleProductModel[] = this.findProduct(prn);
    if (resultProduct.length > 0) {
      const cartProduct = new CartProduct();
      cartProduct.variants = resultProduct[0].variants;
      const lengthOfAvailableSize = cartProduct.variants.length;
      if (lengthOfAvailableSize > 0) {
        if (this.checkWhetherOutOfStock(cartProduct.variants)) {
          console.log('out of stock');
        } else {
          // default selection of size
          cartProduct.addedBy = this.invoice.billedBy;
          cartProduct.selectedSize = 0;
          cartProduct.size = cartProduct.variants[cartProduct.selectedSize].size;
          cartProduct.singleUnitPrice = resultProduct[0].isVariantsWithSamePrice
            ? parseFloat(String(cartProduct.variants[0].sellingPrice))
            : parseFloat(String(cartProduct.variants[cartProduct.selectedSize].sellingPrice));

          cartProduct.maxQuantity = parseFloat(String(cartProduct.variants[cartProduct.selectedSize].stock));

          console.log(resultProduct);
          cartProduct.prn = resultProduct[0].prn;
          cartProduct.categories = resultProduct[0].categories;
          cartProduct.productPreviewUrl = resultProduct[0].isListable ? resultProduct[0].picturesUrl[0] : '';
          cartProduct.productName = resultProduct[0].productName;
          cartProduct.brandName = resultProduct[0].brandName;
          cartProduct.productUid = resultProduct[0].productUid;
          cartProduct.hsnCode = resultProduct[0].hsnCode;
          cartProduct.isVariantsWithSamePrice = resultProduct[0].isVariantsWithSamePrice;
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
        }

      } else {
        return console.log('Product does not exits');
      }

      this.refreshAllProduct();
    } else {
      console.log('prn not found');
    }
  }

  selectSize(cartProduct: CartProduct, index: number) {
    cartProduct.selectedSize = index;
    cartProduct.size = cartProduct.variants[cartProduct.selectedSize].size;
    cartProduct.singleUnitPrice = cartProduct.isVariantsWithSamePrice
      ? parseFloat(String(cartProduct.variants[0].sellingPrice))
      : parseFloat(String(cartProduct.variants[cartProduct.selectedSize].sellingPrice));
    cartProduct.maxQuantity = parseFloat(String(cartProduct.variants[cartProduct.selectedSize].stock));
    this.removeDiscount();
    this.calculateTotal(cartProduct);
  }

  calculateTotal(product) {
    product.calculateProductTotal();
    this.calculateInvoiceTotal();

  }

  async calculateInvoiceTotal() {
    await this.invoice.cartProductsToJson(this.cartProducts);
    this.outStockedProducts = this.cartProducts.filter(value => value.isOutStock === true);
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

    if (i !== -1) {
      this.cartProducts.splice(i, 1);
      this.calculateInvoiceTotal();
    }
  }

  reset() {
    this.cartProducts = [];
    this.invoice = new InvoiceModel();
    this.outStockedProducts = [];
    this.prn = '';
    this.isErrorInSavingInvoice = false;
    this.invoice.typeOfPayment = 'Cash';
    this.refreshAllProduct();
  }

  saveInvoice() {
    if (
      this.invoice.customerNumber.toString().indexOf('') === 0
      && this.invoice.customerNumber.toString().length === 10
      && this.cartProducts.length > 0
      && this.outStockedProducts.length === 0
    ) {
      this.calculateInvoiceTotal();
      this.invoice.storeDetails = {
        storeName: this.currentStore.storeName,
        address: this.currentStore.address ? this.currentStore.address : '',
        mobileNumber: this.currentStore.mobileNumber ? this.currentStore.mobileNumber : '',
        location: this.currentStore.location,
        gstNumber: this.currentStore.gstNumber ? this.currentStore.gstNumber : '',
        storeLogo: this.currentStore.storeLogo ? this.currentStore.storeLogo.localDownloadUrl : ''
      };
      return this.store.dispatch([new LoadingTrue(), new SaveInvoice(this.invoice)]);
    } else {
      this.isErrorInSavingInvoice = true;
    }
  }

}
