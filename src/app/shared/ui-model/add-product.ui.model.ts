import {SingleProductModel} from '../models/product.model';
import {COMMA, ENTER, SLASH} from '@angular/cdk/keycodes';
import {Subscription} from 'rxjs';

export class AddProductUiModel {

  productType: 'STD' | 'VAR' | 'COMBO' = 'STD';
  productTypes = [
    {value: 'STD', name: 'Standard Product'},
    {value: 'VAR', name: 'Product with Variants'},
    // {value: 'COMBO', name: 'Combo Product'}
  ];

  visible = true;
  // tags related variables
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SLASH];
  products: SingleProductModel[] = [];
  private attributesSubscription: Subscription;

  constructor() {

  }

  createProducts(data, store) {
    const children = data.children;
    const products: SingleProductModel[] = [];
    children.forEach((child) => {
      const product = new SingleProductModel();
      product.fromFromData({...data, ...child});
      console.log(product.toJson());
      products.push(product);
    });
    return products;
  }



}


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
