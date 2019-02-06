import {Component, OnInit} from '@angular/core';
import {Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styleUrls: ['./not-found-page.component.css']
})
export class NotFoundPageComponent implements OnInit {

  constructor(private store: Store) {
  }

  ngOnInit() {
  }

  navigateToHome() {
    this.store.dispatch([new Navigate(['select/store'])]);
  }
}
