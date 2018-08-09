import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { User } from '../../models/auth.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  constructor(private afAuth: AngularFireAuth,  private db: AngularFirestore) {

   }

    ///// SignIn - SignOut Process /////

    googleLogin() {
      const provider =  new firebase.auth.GoogleAuthProvider();
      return this.afAuth.auth.signInWithPopup(provider)
        .then(credential =>  {
            this.setUser(credential.user);
            return new User(credential.user);
        }).catch((error) => null);
    }

    signOut() {
      this.afAuth.auth.signOut();
    }

    //// Set user data ////

    /// set database with user info after login
    /// only runs if user role is not already defined in database
    private setUser(authData) {
      const userData = new User(authData);
      const ref = this.db.collection('users').doc(authData.uid).ref;
      ref.onSnapshot((user) => {
        if (!user.exists) {
           ref.set(userData.toJson());
        } else {
          this.updateUser(ref, userData);
        }
        return null;
      });
    }

    private updateUser(ref, userData) {
      ref.update(userData.toJson());
    }

}
