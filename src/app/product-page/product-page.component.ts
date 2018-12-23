import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Actions, ofActionDispatched, Store} from '@ngxs/store';
import {DeleteAProduct, GetProductByUid, GotProductByUid} from '../shared/actions/product.actions';
import {OnlineProductTagModel} from '../shared/models/online-product-tag.model';
import {AddOnlineProductTag, GetOnlineProductTags, GotOnlineProductTagsSuccessfully} from '../shared/actions/online-product-tag.actions';
import {LoadingTrue} from '../shared/state/loading.state';
import {NgbModal, NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import {FirestoreService} from '../shared/service/firestore/firestore.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class ProductPageComponent implements OnInit, OnDestroy {
  productUid;
  product;
  paramsSubscription: Subscription;
  // requiredNumber: string;
  // pageWidth = '5cm';
  // pageHeight = '5cm';
  printContents = '';
  selectedSlide = 0;
  qrCount = 1;
  opt = new OnlineProductTagModel();

  constructor(private activatedRoute: ActivatedRoute,
              private store: Store,
              private actions$: Actions,
              private modalService: NgbModal,
              private dbService: FirestoreService
  ) {
  }

  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.productUid = params['uid'];
      this.store.dispatch([new LoadingTrue(), new GetProductByUid(this.productUid), new GetOnlineProductTags(this.productUid)]);
    });
    this.actions$.pipe(ofActionDispatched(GotProductByUid)).subscribe(({product}) => this.product = product);
    this.actions$.pipe(ofActionDispatched(GotOnlineProductTagsSuccessfully)).subscribe(({opts}) => console.log(opts));
  }

  ngOnDestroy() {

    this.paramsSubscription.unsubscribe();
  }

  open(content) {
    this.modalService.open(content);
  }

  print(count): void {
    this.printContents = '';
    let popupWin;
    for (let i = 0; i < count; i++) {
      this.printContents = document.getElementById('print-section').innerHTML + this.printContents;
    }
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          <style>
           @page {
            size: auto;  /* auto is the initial value */
            margin: 0mm; /* this affects the margin in the printer settings */
          }
          html {
            background-color: #FFFFFF;
            margin: 0px; /* this affects the margin on the HTML before sending to printer */
            padding: 0px;
          }
        .container {
          display: grid;
          grid-template-columns: repeat(auto-fit, 100px);
          grid-template-rows:repeat(auto-fit, 125px);
        }
          </style>
        </head>
    <body onload="window.print();window.close()">
    <div class="container" >

     ${this.printContents}
    </div>
    </body>
      </html>`
    );
    popupWin.document.close();
  }


  deleteProduct() {
    return this.store.dispatch([new DeleteAProduct(this.product['productUid'])]);
  }

  addOpt() {
    this.opt.productUid = this.productUid;
    this.store.dispatch([new AddOnlineProductTag(this.opt)]);
    this.opt = new OnlineProductTagModel();
  }

  incrementStock(index) {
    this.product.variants[index].stock++;
    this.dbService.incrementStock(this.product.productUid, index)
      .catch(() => this.store.dispatch([new LoadingTrue(), new GetProductByUid(this.productUid)]));
  }

  decrementStock(index) {
    this.product.variants[index].stock--;
    this.dbService.decrementStock(this.product.productUid, index)
      .catch(() => this.store.dispatch([new LoadingTrue(), new GetProductByUid(this.productUid)]));
  }
}
