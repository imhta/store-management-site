import {SingleProductModel} from '../models/product.model';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {OnDestroy} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';

export class AddProductUiModel implements OnDestroy {
  attributes$: BehaviorSubject<string[][]>;
  prnGeneratorMode: 'AUTO' | 'CUSTOM';
  productType: 'STD' | 'VAR' | 'COMBO' = 'STD';
  productTypes = [
    {value: 'STD', name: 'Standard Product'},
    {value: 'VAR', name: 'Product with Variants'},
    // {value: 'COMBO', name: 'Combo Product'}
  ];
  isVariantsWithSamePriceAndTax = true;
  // cats
  categories: string[] = [''];
  variants: [][] = [[]];
  attributeValues: string[] = [];
  attributes: string[][] = [[]];
  tags: string[] = [];
  visible = true;
  // tags related variables
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  products: SingleProductModel[] = [];
  private attributesSubscription: Subscription;

  constructor() {
    this.attributes$ = new BehaviorSubject<string[][]>(this.attributes);
    this.attributesSubscription = this.attributes$.subscribe((data) => {
      this.variants = this.cartesian(data);
    });
  }

  ngOnDestroy(): void {
    this.attributesSubscription.unsubscribe();
  }

  updateAtt() {
    this.attributes$.next(this.attributes);
  }

  cartesian(arg) {
    const r = [], max = arg.length - 1;

    function helper(arr, i) {
      for (let j = 0, l = arg[i].length; j < l; j++) {
        const a = arr.slice(0); // clone arr
        a.push(arg[i][j]);
        if (i === max) {
          r.push(a);
        } else {
          helper(a, i + 1);
        }
      }
    }

    helper([], 0);
    return r;
  }
}
