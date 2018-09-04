import { Component, OnInit } from '@angular/core';
import {Select} from '@ngxs/store';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  @Select('loading') loading$;
  loading: boolean;
  constructor() { }

  ngOnInit() {
    this.loading$.subscribe((data) => this.loading = data.valueOf());
  }

}
