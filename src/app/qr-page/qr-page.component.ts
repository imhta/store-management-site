import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-qr-page',
  templateUrl: './qr-page.component.html',
  styleUrls: ['./qr-page.component.scss']
})
export class QrPageComponent implements OnInit {
  Arr = Array;
  paramsSubscription: Subscription;
  data;
  constructor(private activatedRoute: ActivatedRoute) {  }
  ngOnInit() {
    this.paramsSubscription = this.activatedRoute.queryParams.subscribe(params => {
      this.data = this.Arr(Number(params['number'])).fill(params['productId']);
    });
  }

}
