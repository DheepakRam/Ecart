import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { AppUser } from '../models/app-user';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user$:Observable<firebase.User>;

  constructor(private afauth:AngularFireAuth, private route:ActivatedRoute,private router:Router,private userService:UserService) {
    this.user$ = afauth.authState;
   }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);
    this.afauth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider()); 
  }

  logout(){
    this.afauth.auth.signOut();
  }

  get appUser$():Observable<AppUser>{
    return this.user$.pipe(switchMap(user => {
      if(user){
        return this.userService.get(user.uid).valueChanges();
      }
      else{
        return of(null);
      }
    }
    ));
  }

}
