import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from '../../shared/models/auth.model';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {UserStoreState} from '../../shared/models/store.model';
import {SingleProductModel} from '../../shared/models/product.model';

import {MatChipInputEvent, MatDialog} from '@angular/material';
import {UniversalMicroAddDialogComponent} from '../../home/dialogs/universal-micro-add-dialog/universal-micro-add-dialog.component';

import {FirestoreService} from '../../shared/service/firestore/firestore.service';
import {AddProductUiModel} from '../../shared/ui-model/add-product.ui.model';
import {take} from 'rxjs/operators';


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
  storeState: UserStoreState;
  variants: FormArray;
  productForm = this.fb.group({
    prn: [''],
    prnMode: ['auto'],
    productName: ['', [Validators.required]],
    brandName: [''],
    description: [''],
    supplier: [''],
    taxName: [''],
    taxInPercentage: [''],
    storeId: ['', [Validators.required]],
    purchasedPrice: [],
    sellingPrice: [],
    stock: [],
    unit: ['nos'],
    addedBy: ['', [Validators.required]],
  });
  product = new SingleProductModel();

  uiModel = new AddProductUiModel();

  constructor(private fb: FormBuilder, private store: Store, public dialog: MatDialog, private db: FirestoreService) {
  }

  get prn() {
    return this.productForm.get('prn');
  }

  get prnMode() {
    return this.productForm.get('prnMode');
  }

  get brandName() {
    return this.productForm.get('brandName');
  }

  get supplier() {
    return this.productForm.get('supplier');
  }
  get tax() {
    return this.productForm.get('tax');
  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  ngOnInit() {
    this.addStoreId();
    this.addAddedBy();

  }

  ngOnDestroy() {
    this.userDataSubscription.unsubscribe();
    this.storeDataSubscription.unsubscribe();
  }

  openNewUniversalAddDialog(type: string, src: string, index?: number): void {
    const dialogRef = this.dialog.open(UniversalMicroAddDialogComponent, {
      closeOnNavigation: true,
      autoFocus: true,
      width: '350px',
      data: {storeId: this.currentStore['storeUid'], type: type, name: '', src: src}
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe(result => {
      switch (result.src) {
        case 'brands': {
          this.brandName.patchValue(result.name);
          break;
        }
        case 'categories': {
          this.uiModel.categories[index] = result.name;
          break;
        }
        case 'suppliers': {
          this.supplier.patchValue(result.name);
          break;
        }
        // case 'taxes': {
        //   break;
        // }
        case 'attributes': {
          this.uiModel.attributeValues[index] = result.name;
          break;
        }
      }
    });
  }

  onSubmit() {
    // this.getHsn();
    // if (this.productForm.valid) {
    //   this.addStoreId();
    //   this.addAddedBy();
    //   this.product.fromStoreDate({
    //     address: this.currentStore.address,
    //     location: this.currentStore.location,
    //     name: this.currentStore.storeName
    //   });
    //   this.product.fromFromData(this.productForm.value);
    //   this.product.picturesUrl.length > 0 ? this.product.isListable = true : this.product.isListable = false;
    //   this.store.dispatch([new LoadingTrue(), new UploadSingleProduct(this.product)]);
    //   this.productForm.reset();
    //   this.tagsArray = [];
    //   this.tagVal = '';
    // } else {
    //   Object.keys(this.productForm.controls).forEach(key => {
    //     this.productForm.controls[key].markAsDirty();
    //   });
    // }

  }


  addStoreId() {
    this.storeDataSubscription = this.storeState$.subscribe((data) => {
      this.storeState = new UserStoreState(data.valueOf());
      this.currentStore = this.storeState.linkedStores[this.storeState.selectedStore];
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

  getDownloadUrls(downloadUrls: string[]) {
    this.product.picturesUrl = downloadUrls;

  }

  getPicturePath(picturePath: string[]) {
    this.product.picturesPath = picturePath;
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tags
    if ((value || '').trim()) {
      this.uiModel.tags.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(tag: string): void {
    const index = this.uiModel.tags.indexOf(tag);

    if (index >= 0) {
      this.uiModel.tags.splice(index, 1);
    }
  }

  addAttributeVal(event: MatChipInputEvent, index: number): void {
    const input = event.input;
    const value = event.value;

    // Add our tags
    if ((value || '').trim()) {
      this.uiModel.attributes[index].push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.uiModel.updateAtt();
  }

  removeAttributeVal(tag: string, i: number): void {
    const index = this.uiModel.attributes[i].indexOf(tag);

    if (index >= 0) {
      this.uiModel.attributes[i].splice(index, 1);
    }
    this.uiModel.updateAtt();
  }

}
