import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from '../shared/models/auth.model';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {UserStoreState} from '../shared/models/store.model';
import {SingleProductModel} from '../shared/models/product.model';
import {LoadingTrue} from '../shared/state/loading.state';
import {UploadSingleProduct} from '../shared/actions/product.actions';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

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
  tagVal: string;
  tagsArray = [];
  productForm = this.fb.group({
    gender: ['Men'],
    brandName: [''],
    productName: [''],
    categories: this.fb.group({
      category1: [''],
      category2: [''],
      category3: [''],
    }),
    description: [''],
    storeId: [''],
    tags: [['']],
    taxType: ['textile'],
    inclusiveAllTaxes: [true],
    otherTax: ['0'],
    addedBy: [''],
    ssp: this.fb.array([this.createSspItem()])
  });
  product = new SingleProductModel();

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

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
    this.tagsArray = [];
    this.tagVal = '';
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

  addTag() {
    const isWhitespace = (this.tagVal || '').trim().length === 0;
    if (!isWhitespace) {
      if (this.tagsArray.length < 5) {
        this.tagsArray.push(this.tagVal);
        this.tagVal = '';
        this.productForm.patchValue({tags: this.tagsArray});
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
      this.productForm.patchValue({tags: this.tagsArray});
    }
  }

}
