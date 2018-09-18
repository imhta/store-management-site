import {Component} from '@angular/core';
import {Store} from '@ngxs/store';
import {LoadingTrue} from './shared/state/loading.state';
import {CheckAuthState} from './shared/actions/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private  store: Store) {
    this.store.dispatch([new LoadingTrue(), new CheckAuthState()]);
  }
}

