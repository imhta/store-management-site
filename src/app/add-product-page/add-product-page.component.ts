import {Component, OnDestroy, OnInit} from '@angular/core';
import { Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from '../shared/models/auth.model';
import {FormBuilder} from '@angular/forms';
import { UserStoreState} from '../shared/models/store.model';
import {LoadingTrue} from '../shared/state/loading.state';
import {SingleProductModel} from '../shared/models/product.model';
import { UploadSingleProduct} from '../shared/actions/product.actions';


@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.css']
})
export class AddProductPageComponent implements OnInit, OnDestroy {
  @Select('user') user$: Observable<object>;
  @Select('storeState') storeState$: Observable<object>;
  userDataSubscription: Subscription;
  storeDataSubscription: Subscription;
  user: UserModel;
  storeState: UserStoreState;
  tagVal: string;
  tagsArray = [];
  productForm = this.fb.group({
    productName: [''],
    type: [''],
    description: [''],
    stock: [''],
    price: [''],
    tags: [['']],
    storeId: [''],
    addedBy: [''],

  });


  constructor(private fb: FormBuilder, private store: Store) {  }

  ngOnInit() {
    this.userDataSubscription = this.user$.subscribe((data) => {
      this.user = data.valueOf();
      this.productForm.patchValue({addedBy: this.user.uid});
    });
    this.storeDataSubscription = this.storeState$.subscribe((data) => {
      this.storeState = new UserStoreState(data.valueOf());
      const currentStore = this.storeState.linkedStores[this.storeState.selectedStore];
      this.productForm.patchValue({storeId: currentStore['storeUid']});
    });
  }

  ngOnDestroy() {
    this.userDataSubscription.unsubscribe();
    this.storeDataSubscription.unsubscribe();
  }

  onSubmit() {
    this.productForm.patchValue({tags: this.tagsArray});
    const product = new SingleProductModel(this.productForm.value);

    this.store.dispatch([new LoadingTrue(), new UploadSingleProduct(product)]);
    this.productForm.reset();
    this.tagsArray = [];

  }

  addTag() {
    const isWhitespace = (this.tagVal || '').trim().length === 0;
    if (!isWhitespace) {
      if (this.tagsArray.length < 5) {
        this.tagsArray.push(this.tagVal);
        this.tagVal = '';
      } else {
        console.log('tag is full');
      }
    } else {
      console.log('cannot add empty tag');
    }
  }

  removeTag(index: number) {
    if (index > -1) {
      this.tagsArray.splice(index, 1);
    }
  }
}
