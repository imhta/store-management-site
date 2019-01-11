import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {FormBuilder, Validators} from '@angular/forms';
import {Actions, ofActionDispatched, Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {UserStoreState} from '../../shared/models/store.model';
import {
  DeleteADiscount,
  DiscountDeletedSuccessfully,
  DiscountUploadedSuccessfully,
  GetAllDiscounts,
  GotAllDiscountsSuccessfully,
  UploadDiscount
} from '../../shared/actions/discount.actions';
import {DiscountModel} from '../../shared/models/discount.model';
import {debounceTime, distinctUntilChanged, map, take} from 'rxjs/operators';
import {SingleProductModel} from '../../shared/models/product.model';
import {GetAllProducts} from '../../shared/actions/product.actions';

@Component({
  selector: 'app-discounts-manager',
  templateUrl: './discounts-manager.component.html',
  styleUrls: ['./discounts-manager.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class DiscountsManagerComponent implements OnInit, OnDestroy {
  @Select('storeState') storeState$: Observable<object>;
  @Select('allProducts') productState$: Observable<SingleProductModel[]>;
  allProducts: SingleProductModel[];
  storeDataSubscription: Subscription;
  discountForm = this.fb.group({
    storeUid: ['', Validators.compose([Validators.required])],
    discountConditionalNote: ['', Validators.compose([Validators.required])],
    discountType: ['All', Validators.compose([Validators.required])],
    discountName: ['', Validators.compose([Validators.required])],
    amountType: ['percentage', Validators.compose([Validators.required])],
    amount: ['', Validators.compose([Validators.required])],
    appliedFor: [[]],
  });
  private tagsArray: string[] = [];
  private tagVal: string;
  private storeUid: string;
  allDiscounts: DiscountModel[] = [];
  tagSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : this.allProducts.map(v => v['prn']).filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).reverse().slice(0, 10))
    )


  constructor(
    config: NgbModalConfig,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private store: Store,
    private  actions$: Actions) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.addStoreIdAndGetAllDiscount();
    this.productState$.subscribe((data) => this.allProducts = data);
  }

  ngOnInit() {
    this.actions$
      .pipe(ofActionDispatched(DiscountUploadedSuccessfully, DiscountDeletedSuccessfully))
      .subscribe(() => this.store.dispatch([new GetAllDiscounts(this.storeUid)]));
    this.actions$.pipe(ofActionDispatched(GotAllDiscountsSuccessfully)).subscribe(({allDiscount}) => this.allDiscounts = allDiscount);
  }
  ngOnDestroy() {
    this.storeDataSubscription.unsubscribe();
    this.modalService.dismissAll();
  }
  getAllDiscountsAndProducts(storeUid) {
    this.store.dispatch([new GetAllDiscounts(storeUid), new GetAllProducts(storeUid)]);
  }
  addStoreIdAndGetAllDiscount() {
    this.storeDataSubscription = this.storeState$.subscribe((data) => {
      const storeState = new UserStoreState(data.valueOf());
      const currentStore = storeState.linkedStores[storeState.selectedStore];
      this.storeUid = currentStore['storeUid'];
      this.discountForm.patchValue({storeUid: this.storeUid});
      this.getAllDiscountsAndProducts(this.discountForm.get('storeUid').value);
    });
  }

  openAddDiscountModel(content) {
    this.modalService.open(content, {centered: true});
  }
  validateDiscount() {
    if (this.discountForm.valid) {
      if ( this.discountForm.get('discountType').value === 'All') {
        return true;
      } else {
        return this.tagsArray.length > 0;
      }
    } else {
      return false;
    }
  }
  saveDiscount() {
    if (this.validateDiscount()) {
      this.store.dispatch([new UploadDiscount(new DiscountModel(this.discountForm.value))]);
      this.modalService.dismissAll();
    } else {
      console.log('discount is invalid');
    }
  }
  deleteDiscount(discountUid) {
    this.store.dispatch([new DeleteADiscount(discountUid)]);
  }
  selectDiscountType(discountType): void {
    this.discountForm.patchValue({discountType: discountType});
  }

  selectAmountType(amountType): void {
    this.discountForm.patchValue({amountType: amountType});
  }

  addTag() {
    const isWhitespace = (this.tagVal || '').trim().length === 0;
    if (!isWhitespace && this.tagVal.split(' ').length === 1) {
      this.tagsArray.push(this.tagVal);
      this.tagVal = '';
      this.discountForm.patchValue({appliedFor: this.tagsArray});
    } else {
      console.log('cannot add empty tag');
    }
  }

  removeTag(index: number) {
    if (index > -1) {
      this.tagsArray.splice(index, 1);
      this.discountForm.patchValue({appliedFor: this.tagsArray});
    }
  }
}
