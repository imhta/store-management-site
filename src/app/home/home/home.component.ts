import {ChangeDetectorRef, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {Actions, Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {MediaMatcher} from '@angular/cdk/layout';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {Navigate} from '@ngxs/router-plugin';
import {ResetSelectedStore} from '../../shared/actions/store.actions';


declare var gtag;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  @Select('loading') loading$: Observable<boolean>;
  loading = false;
  private _mobileQueryListener: () => void;

  constructor(
    private  store: Store,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private actions$: Actions,
    private router: Router,
  ) {
    this.loading$.subscribe((data) => this.loading = data);
    // updates.available.subscribe(event => {
    //   updates.activateUpdate().then(() => document.location.reload());
    // });
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener, false);
    const navEndEvents = router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    );
    navEndEvents.subscribe((event: NavigationEnd) => {
      gtag('config', 'UA-131596995-2', {
        'page_path': event.urlAfterRedirects
      });
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (this.router.routerState.snapshot.url.split('/')[2] === 'u') {

      const id = this.router.routerState.snapshot.url.split('/')[3];
      const litKeys = event.altKey && event.ctrlKey;
      if (litKeys && (event.key === 'B' || event.key === 'b')) {
        return this.store.dispatch([new Navigate([`go/u/${id}/sales`])]);
      } else if (litKeys && (event.key === 'I' || event.key === 'i')) {
        return this.store.dispatch([new Navigate([`go/u/${id}/invoice`])]);
      } else if (litKeys && (event.key === 'A' || event.key === 'a')) {
        return this.store.dispatch([new Navigate([`go/u/${id}/add`])]);
      } else if (litKeys && (event.key === 'C' || event.key === 'c')) {
        return this.store.dispatch([new Navigate([`go/u/${id}/customers`])]);
      } else if (litKeys && (event.key === 'D' || event.key === 'd')) {
        return this.store.dispatch([new Navigate([`go/u/${id}/dashboard`])]);
      } else if (litKeys && (event.key === 'H' || event.key === 'h')) {
        return this.store.dispatch([new Navigate([`go/u/${id}/store`])]);
      } else if (litKeys && (event.key === 'X' || event.key === 'x')) {
        this.store.dispatch([new ResetSelectedStore(null), new Navigate(['go'])]);
      }
    }
  }

  ngOnInit() {
  }


  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener, false);
  }

  toggle($event, snav) {
    // this.store.dispatch([new OpenSnackBarWithoutCustomAction('hiiiii')]);
    if (this.mobileQuery.matches) {
      return snav.toggle();
    } else {
      return null;
    }
  }

}
