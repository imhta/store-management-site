import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from '../../shared/models/auth.model';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserStoreState} from '../../shared/models/store.model';
import {SingleProductModel} from '../../shared/models/product.model';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {LoadingTrue} from '../../shared/state/loading.state';
import {UploadSingleProduct} from '../../shared/actions/product.actions';


const tags = ['Shirt', 'T- Shirt', 'Track', 'Casuals', 'Formals', 'Full Pant', 'Half Pant',
  'Trouser', 'Jeans', 'Full Hand', 'Half Hand', 'Saree', 'Silk',
  'Cotton', 'Wool', 'Chudidar', 'Tops', 'Inner Wears', 'Watches', 'Wallets', 'Shoes', 'Designer', 'Western Wear',
  'Ethnic Wear', 'Sports Wear', 'Lingerie & Nightwear', 'Handbags', 'Sunglasses', 'New Trend', 'Celeb Fashion', 'Scandals',
  'Party Wear', 'Fitness', 'Blazers', 'Chinos', 'Loafers', 'Camouflage Print', 'Joggers', 'Shorts',
  'Kurtas', 'Dhotis, Mundus & Lungis', 'Swim Wear', 'Jackets', 'Palau', 'Vests', 'Lounge Wear', 'Boxers',
  'Briefs', 'Salwar suits', 'Tees', 'Jeggings', 'Capris', 'Panties', 'Bras', 'Sports Bras',
  'Tights', 'Summer Wear', 'Winter Wear', 'Sweatshirts'];
const colors = ['AliceBlue', 'AntiqueWhite', 'Aqua', 'Aquamarine', 'Azure', 'Beige',
  'Bisque', 'Black', 'BlanchedAlmond', 'Blue', 'BlueViolet', 'Brown', 'BurlyWood', 'CadetBlue',
  'Chartreuse', 'Chocolate', 'Coral', 'CornflowerBlue', 'Cornsilk', 'Crimson', 'Cyan', 'DarkBlue',
  'DarkCyan', 'DarkGoldenRod', 'DarkGray', 'DarkGrey', 'DarkGreen', 'DarkKhaki', 'DarkMagenta', 'DarkOliveGreen',
  'Darkorange', 'DarkOrchid', 'DarkRed', 'DarkSalmon', 'DarkSeaGreen', 'DarkSlateBlue', 'DarkSlateGray', 'DarkSlateGrey',
  'DarkTurquoise', 'DarkViolet', 'DeepPink', 'DeepSkyBlue', 'DimGray', 'DimGrey', 'DodgerBlue', 'FireBrick', 'FloralWhite',
  'ForestGreen', 'Fuchsia', 'Gainsboro', 'GhostWhite', 'Gold', 'GoldenRod', 'Gray', 'Grey', 'Green', 'GreenYellow', 'HoneyDew',
  'HotPink', 'IndianRed', 'Indigo', 'Ivory', 'Khaki', 'Lavender', 'LavenderBlush', 'LawnGreen', 'LemonChiffon', 'LightBlue',
  'LightCoral', 'LightCyan', 'LightGoldenRodYellow', 'LightGray', 'LightGrey', 'LightGreen', 'LightPink', 'LightSalmon',
  'LightSeaGreen', 'LightSkyBlue', 'LightSlateGray', 'LightSlateGrey', 'LightSteelBlue', 'LightYellow', 'Lime', 'LimeGreen',
  'Linen', 'Magenta', 'Maroon', 'MediumAquaMarine', 'MediumBlue', 'MediumOrchid', 'MediumPurple', 'MediumSeaGreen', 'MediumSlateBlue',
  'MediumSpringGreen', 'MediumTurquoise', 'MediumVioletRed', 'MidnightBlue', 'MintCream', 'MistyRose', 'Moccasin', 'NavajoWhite', 'Navy',
  'OldLace', 'Olive', 'OliveDrab', 'Orange', 'OrangeRed', 'Orchid', 'PaleGoldenRod',
  'PaleGreen', 'PaleTurquoise', 'PaleVioletRed', 'PapayaWhip', 'PeachPuff', 'Peru', 'Pink', 'Plum',
  'PowderBlue', 'Purple', 'Red', 'RosyBrown', 'RoyalBlue', 'SaddleBrown', 'Salmon', 'SandyBrown', 'SeaGreen', 'SeaShell',
  'Sienna', 'Silver', 'SkyBlue', 'SlateBlue', 'SlateGray', 'SlateGrey', 'Snow', 'SpringGreen', 'SteelBlue', 'Tan', 'Teal',
  'Thistle', 'Tomato', 'Turquoise', 'Violet', 'Wheat', 'White', 'WhiteSmoke', 'Yellow', 'YellowGreen'];
const occasionsCat = [
  'Casuals', 'Party', 'Lingerie & Night Wear', 'Sports', 'Formals', 'Wedding', 'Summer', 'Winter', 'Swim Wear'
];
const styleCat = [
  'Full Hand', 'Half Hand', 'Sleeveless', 'V-Neck', 'U-Neck', 'Tight', 'Designer', 'Custom', 'HipHop', 'Polo', 'Boxer', 'Leggings'
];
@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.css'],
})
export class AddProductPageComponent implements OnInit, OnDestroy {
  @Select('user') user$: Observable<object>;
  @Select('storeState') storeState$: Observable<object>;
  userDataSubscription: Subscription;
  storeDataSubscription: Subscription;
  user: UserModel;
  currentStore;
  variants: FormArray;
  tagVal: string;
  tagsArray = [];
  productForm = this.fb.group({
    gender: ['Men', Validators.compose([Validators.required])],
    brandName: ['', Validators.compose([Validators.required])],
    productName: ['', Validators.compose([Validators.required])],
    categories: this.fb.group({
      category1: [''],
      category2: [''],
      colorCategory: [''],
    }),
    description: [''],
    storeId: ['', Validators.compose([Validators.required])],
    tags: [['']],
    isVariantsWithSamePrice: [true],
    hasNoGstNumber: [true],
    taxType: ['textile', Validators.compose([Validators.required])],
    inclusiveAllTaxes: [true, Validators.compose([Validators.required])],
    otherTax: ['0', Validators.compose([Validators.required])],
    addedBy: ['', Validators.compose([Validators.required])],
    variants: this.fb.array([this.createVariant()]),
    hsnCode: ['']
  });
  product = new SingleProductModel();
  tags = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : tags.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  colors = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : colors.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  occasionsCat = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : occasionsCat.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  styleCat = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 1 ? []
        : styleCat.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  constructor(private fb: FormBuilder, private store: Store) {

  }

  ngOnInit() {
    this.variants = this.productForm.get('variants') as FormArray;
    this.addStoreId();
    this.addAddedBy();
  }

  ngOnDestroy() {
    this.userDataSubscription.unsubscribe();
    this.storeDataSubscription.unsubscribe();
  }

  onSubmit() {
    this.getHsn();
    if (this.productForm.valid) {
      this.addStoreId();
      this.addAddedBy();
      this.product.fromStoreDate({
        address: this.currentStore.address,
        location: this.currentStore.location,
        name: this.currentStore.storeName
      });
      this.product.fromFromData(this.productForm.value);
      this.product.picturesUrl.length > 0 ? this.product.isListable = true : this.product.isListable = false;
      this.store.dispatch([new LoadingTrue(), new UploadSingleProduct(this.product)]);
      this.productForm.reset();
      this.tagsArray = [];
      this.tagVal = '';
    } else {
      Object.keys(this.productForm.controls).forEach(key => {
        this.productForm.controls[key].markAsDirty();
      });
    }

  }

  getHsn() {
    switch (this.productForm.get('taxType').value) {
      case 'textile': {
        this.productForm.patchValue({hsnCode: '61'});
        break;
      }
      case 'footwear': {
        this.productForm.patchValue({hsnCode: '64'});
        break;
      }
    }
  }

  addStoreId() {
    this.storeDataSubscription = this.storeState$.subscribe((data) => {
      const storeState = new UserStoreState(data.valueOf());
      this.currentStore = storeState.linkedStores[storeState.selectedStore];
      this.productForm.patchValue(
        {
          storeId: this.currentStore['storeUid'],
          hasNoGstNumber: this.currentStore['hasNoGstNumber']
        });
    });
  }

  addAddedBy() {
    this.userDataSubscription = this.user$.subscribe((data) => {
      this.user = data.valueOf();
      this.productForm.patchValue({addedBy: this.user.uid});
    });
  }

  createVariant(): FormGroup {
    return this.fb.group({
      size: [''],
      stock: [],
      purchasedPrice: [],
      sellingPrice: []
    });
  }

  addItem(): void {
    this.variants.push(this.createVariant());
  }

  removeItem(i): void {
    if (i !== 0) {
      this.variants.removeAt(i);
    }
  }

  selectGender(selectedGender): void {
    this.productForm.patchValue({gender: selectedGender});
  }

  getDownloadUrls(downloadUrls: string[]) {
    this.product.picturesUrl = downloadUrls;

  }

  getPicturePath(picturePath: string[]) {
    this.product.picturesPath = picturePath;
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
