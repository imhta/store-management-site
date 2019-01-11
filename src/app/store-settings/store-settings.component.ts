import {Component, OnDestroy, OnInit} from '@angular/core';
import {Actions, ofActionDispatched, Select, Store} from '@ngxs/store';
import {Navigate} from '@ngxs/router-plugin';
import {UserStoreState} from '../shared/models/store.model';
import {Observable, Subscription} from 'rxjs';
import {
  GetLinkedStores,
  UpdateStoreDescription,
  UpdateUniqueStoreName,
  UpdateUniqueStoreNameSuccessful,
  UploadStoreLogo,
  UploadStorePictures
} from '../shared/actions/store.actions';
import {LoadingTrue} from '../shared/state/loading.state';
import {AuthState} from '../shared/state/auth.state';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';



@Component({
  selector: 'app-store-settings',
  templateUrl: './store-settings.component.html',
  styleUrls: ['./store-settings.component.css']
})
export class StoreSettingsComponent implements OnInit, OnDestroy {
  @Select('storeState') storeState$: Observable<object>;
  @Select('loading') loading$: Observable<boolean>;
  loading = true;
  storeDataSubscription: Subscription;
  storeState: UserStoreState;
  currentStore;
  storePictures = {localDownloadUrls: [], localPictureRefs: []};
  logo = {localDownloadUrl: '', localPictureRefs: ''};
  uniqueStoreName: string;
  storeDescription: string;
  isAvailable = true;
  previewUrl = environment.firebase.projectId;
  constructor(private store: Store, private actions$: Actions, private router: Router) {
    this.store.dispatch([new GetLinkedStores(this.store.selectSnapshot(AuthState.uid))]);
  }

  ngOnInit() {
    this.loading$.subscribe((loading) => this.loading = loading.valueOf());
    this.storeDataSubscription = this.storeState$.subscribe((data) => {
      this.storeState = new UserStoreState(data.valueOf());
      this.currentStore = this.storeState.linkedStores[this.storeState.selectedStore];
      this.uniqueStoreName = this.currentStore['usn']
        ? this.currentStore['usn']
        : '';
      this.storeDescription = this.currentStore['description']
        ? this.currentStore['description']
        : '';
      this.logo = this.currentStore['storeLogo']
        ? this.currentStore['storeLogo']
        : {localDownloadUrl: '', localPictureRefs: ''};
      this.storePictures = this.currentStore['storePictures']
        ? this.currentStore['storePictures']
        : {localDownloadUrls: [], localPictureRefs: []};
    });
  }

  ngOnDestroy() {
    this.storeDataSubscription.unsubscribe();
  }

  navigateToStore() {
    const id = +this.router.routerState.snapshot.url.split('/')[2];
    this.store.dispatch([new Navigate([`u/${id}/store`])]);
  }

  getLogoData(data) {
    this.store.dispatch([new UploadStoreLogo(this.currentStore['storeUid'], data)]);
  }

  getStorePicturesData(data) {
    this.store.dispatch([new UploadStorePictures(this.currentStore['storeUid'], data)]);
  }

  noSpecialCharacters() {
    return !/[^a-zA-Z0-9 ]/.test(this.uniqueStoreName);
  }
  checkUniqueness() {
    if (this.uniqueStoreName.length >= 5 && this.uniqueStoreName.split(' ').length === 1 && this.noSpecialCharacters()) {
      this.store
        .dispatch([new LoadingTrue(), new UpdateUniqueStoreName(this.currentStore['storeUid'], this.uniqueStoreName.toLowerCase())]);
      this.actions$
        .pipe(ofActionDispatched(UpdateUniqueStoreNameSuccessful))
        .subscribe(({result}) => this.isAvailable = result);
    }
  }

  saveStoreDescription() {
    this.store.dispatch([new UpdateStoreDescription(this.currentStore['storeUid'], this.storeDescription)]);
  }
}
