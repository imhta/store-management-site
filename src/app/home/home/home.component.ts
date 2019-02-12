import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Actions, ofActionDispatched, Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {MediaMatcher} from '@angular/cdk/layout';
import {NavigationEnd, Router} from '@angular/router';
import { OpenSnackBarWithoutCustomAction} from '../../shared/state/app-general.state';
import {filter} from 'rxjs/operators';


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

  ngOnInit() {}


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
