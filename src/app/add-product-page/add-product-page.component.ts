import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from '../shared/models/auth.model';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {UserStoreState} from '../shared/models/store.model';
import {SingleProductModel} from '../shared/models/product.model';
import {LoadingTrue} from '../shared/state/loading.state';
import {UploadSingleProduct} from '../shared/actions/product.actions';


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
  sspItems: FormArray;
  productForm = this.fb.group({
    gender: ['Men'],
    productName: [''],
    category: [''],
    description: [''],
    storeId: [''],
    addedBy: [''],
    ssp: this.fb.array([this.createSspItem()])
  });
  product = new SingleProductModel();

  constructor(private fb: FormBuilder, private store: Store) {

  }

  ngOnInit() {
    this.sspItems = this.productForm.get('ssp') as FormArray;
    this.addStoreId();
    this.addAddedBy();
  }

  ngOnDestroy() {
    this.userDataSubscription.unsubscribe();
    this.storeDataSubscription.unsubscribe();
  }

  onSubmit() {

    this.addStoreId();
    this.addAddedBy();
    this.product.fromFromData(this.productForm.value);
    this.product.picturesUrls.length > 0 ? this.product.isListable = true : this.product.isListable = false;
    this.store.dispatch([new LoadingTrue(), new UploadSingleProduct(this.product)]);
    this.productForm.reset();

  }

  addStoreId() {
    this.storeDataSubscription = this.storeState$.subscribe((data) => {
      this.storeState = new UserStoreState(data.valueOf());
      const currentStore = this.storeState.linkedStores[this.storeState.selectedStore];
      this.productForm.patchValue({storeId: currentStore['storeUid']});
    });
  }

  addAddedBy() {
    this.userDataSubscription = this.user$.subscribe((data) => {
      this.user = data.valueOf();
      this.productForm.patchValue({addedBy: this.user.uid});
    });
  }

  createSspItem(): FormGroup {
    return this.fb.group({
      size: [''],
      stock: [''],
      price: ['']
    });
  }

  addItem(): void {
    this.sspItems.push(this.createSspItem());
  }

  removeItem(i): void {
    if (i !== 0) {
      this.sspItems.removeAt(i);
    }
  }

  selectGender(selectedGender): void {
    this.productForm.patchValue({gender: selectedGender});
  }

  getDownloadUrls(downloadUrls: string[]) {
    this.product.picturesUrls = downloadUrls;

  }

  getPicturePath(picturePath: string[]) {
    this.product.picturesPaths = picturePath;
  }
}
