import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class AuthService {

  public user: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;
   }

   login(email, password): Observable<any> {
     return Observable.fromPromise(
       this.afAuth.auth.signInWithEmailAndPassword(email, password)
     );
   }

   signup(email, password): Observable<any> {
    return Observable.fromPromise(
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.user.map(user => user && user.uid !== undefined);
  }

  logout(){
    this.afAuth.auth.signOut();
  }
  resetPassword(email:string){
    const fbAuth = firebase.auth();
    return fbAuth.sendPasswordResetEmail(email)
    .then(() => console.log("email sent"))
    .catch((error) => console.log(error))

  }

}
