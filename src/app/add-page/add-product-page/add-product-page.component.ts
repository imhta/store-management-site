import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {Observable, Subscription} from 'rxjs';
import {UserModel} from '../../shared/models/auth.model';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserStoreState} from '../../shared/models/store.model';

import {MatChipInputEvent, MatDialog} from '@angular/material';
import {UniversalMicroAddDialogComponent} from '../../home/dialogs/universal-micro-add-dialog/universal-micro-add-dialog.component';

import {FirestoreService} from '../../shared/service/firestore/firestore.service';
import {AddProductUiModel} from '../../shared/ui-model/add-product.ui.model';
import {take} from 'rxjs/operators';
import {UploadSingleProduct} from '../../shared/actions/product.actions';


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
  childrenSubscription: Subscription;
  isListableSubscription: Subscription;
  user: UserModel;
  currentStore;
  storeState: UserStoreState;
  productForm = this.fb.group({
    prn: [''],
    groupId: [''],
    prnMode: ['auto'],
    productName: ['', [Validators.required]],
    brandName: [''],
    description: [''],
    tags: this.fb.array([]),
    categories: this.fb.array([this.createCategory('')]),
    supplier: [''],
    trackThisProduct: [false],
    isVariantsWithSamePriceAndTax: [true],
    unit: ['nos'],
    attributeTemplate: [''],
    pictures: this.fb.group({
      path: [[]],
      url: [[]]
    }),
    isListable: false,
    children: this.fb.array([this.createChild('')]),
    hasNoGstNumber: [''],
    storeDetails: {},
    storeId: ['', [Validators.required]],
    addedBy: ['', [Validators.required]],
  });
  uiModel = new AddProductUiModel();
  step = 0;

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

  get pictures() {
    return this.productForm.get('pictures');
  }

  get isVariantsWithSamePriceAndTax() {
    return this.productForm.get('isVariantsWithSamePriceAndTax');
  }

  get tags() {
    return this.productForm.get('tags') as FormArray;
  }

  get categories() {
    return this.productForm.get('categories') as FormArray;
  }

  get attributeTemplate() {
    return this.productForm.get('attributeTemplate');
  }

  get children() {
    return this.productForm.get('children') as FormArray;
  }

  get firstChildAttribute() {
    return this.children.at(0).get('attributeValues') as FormArray;
  }


  childAttribute(index) {
    return this.children.at(index).get('attributeValues') as FormArray;
  }

  ngOnInit() {
    this.addStoreDetails();
    this.addAddedBy();
    this.childrenSubscription = this.children.at(0).valueChanges.subscribe((data) => {
      if (this.isVariantsWithSamePriceAndTax.value) {
        for (let i = 1; i < this.children.controls.length; i++) {
          this.children.at(i).patchValue({
            taxName: this.children.at(0).get('taxName').value,
            taxInPercentage: this.children.at(0).get('taxInPercentage').value,
            inclusiveOfAllTaxes: this.children.at(0).get('inclusiveOfAllTaxes').value,
            purchasedPrice: this.children.at(0).get('purchasedPrice').value,
            marginInPercentage: this.children.at(0).get('marginInPercentage').value,
            sellingPrice: this.children.at(0).get('sellingPrice').value
          });
        }
      }
    });

    this.isListableSubscription = this.pictures.valueChanges.subscribe((data) => {
      if (data.url.length > 0 || data.path.length > 0) {
        this.productForm.get('isListable').patchValue(true);
      } else {
        this.productForm.get('isListable').patchValue(false);
      }
    });

  }

  ngOnDestroy() {
    this.userDataSubscription.unsubscribe();
    this.storeDataSubscription.unsubscribe();
    this.childrenSubscription.unsubscribe();
    this.isListableSubscription.unsubscribe();
  }


  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
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
          this.categories.at(index).patchValue(result.name);
          break;
        }
        case 'suppliers': {
          this.supplier.patchValue(result.name);
          break;
        }
        case 'taxes': {
          this.children.at(index).get('taxInPercentage').patchValue(result.taxInPercentage);
          this.children.at(index).get('taxName').patchValue(result.name);
          break;
        }
        case 'attributes': {
          this.attributeTemplate.patchValue(result.name);
          break;
        }
      }
    });
  }

  onSubmit() {

   this.store.dispatch([new UploadSingleProduct(this.uiModel.createProducts(this.productForm.value, this.currentStore))]) ;

    // if (this.productForm.valid) {
    //   this.addStoreDetails();
    //   this.addAddedBy();
    //   this.productForm.reset();
    // } else {
    //   Object.keys(this.productForm.controls).forEach(key => {
    //     this.productForm.controls[key].markAsDirty();
    //   });
    // }

  }


  addStoreDetails() {
    this.storeDataSubscription = this.storeState$.subscribe((data) => {
      this.storeState = new UserStoreState(data.valueOf());
      this.currentStore = this.storeState.linkedStores[this.storeState.selectedStore];
      this.productForm.patchValue(
        {
          storeId: this.currentStore['storeUid'],
          hasNoGstNumber: this.currentStore['hasNoGstNumber'],
          storeDetails: {
            address: this.currentStore.address,
            location: this.currentStore.location,
            name: this.currentStore.storeName
          }
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
    this.productForm.get('pictures').get('url').patchValue(downloadUrls);

  }

  getPicturePath(picturePath: string[]) {
    this.productForm.get('pictures').get('path').patchValue(picturePath);
  }

  createChild(type: string): FormGroup {
    switch (type) {
      case 'SAME': {
        return this.fb.group({
          attributeValues: this.fb.array([]),
          supplierCode: [''],
          stock: [''],
          reorderPoint: [''],
          taxName: [this.children.at(0).get('taxName').value],
          taxInPercentage: [this.children.at(0).get('taxInPercentage').value],
          inclusiveOfAllTaxes: [this.children.at(0).get('inclusiveOfAllTaxes').value],
          purchasedPrice: [this.children.at(0).get('purchasedPrice').value],
          marginInPercentage: [this.children.at(0).get('marginInPercentage').value],
          sellingPrice: [this.children.at(0).get('sellingPrice').value]
        });
      }
      default: {
        return this.fb.group({
          attributeValues: this.fb.array([]),
          supplierCode: [''],
          stock: [''],
          reorderPoint: [''],
          taxName: '',
          taxInPercentage: [''],
          inclusiveOfAllTaxes: false,
          purchasedPrice: [''],
          marginInPercentage: [''],
          sellingPrice: ['']
        });
      }
    }

  }

  createTag(value): FormControl {
    return this.fb.control(value);
  }

  createCategory(value): FormControl {
    return this.fb.control(value);
  }

  createAttribute(value): FormControl {
    return this.fb.control(value);
  }

  addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our tags
    if ((value || '').trim()) {
      this.tags.push(this.createTag(value.trim()));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeTag(index: number): void {

    if (index >= 0) {
      this.tags.removeAt(index);
    }
  }

  addAttributeVal(event: MatChipInputEvent, index: number): void {
    const input = event.input;
    const value = event.value;

    // Add our tags
    if ((value || '').trim()) {
      this.childAttribute(index).push(this.createAttribute(value.trim().toUpperCase()));
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeAttributeVal(index: number): void {


    if (index >= 0) {
      this.childAttribute(index).removeAt(index);
    }
  }

}
