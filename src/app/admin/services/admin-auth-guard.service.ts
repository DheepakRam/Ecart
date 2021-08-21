import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(private auth:AuthService,private userService:UserService) { }

  canActivate(){
    return this.auth.user$
    .pipe(switchMap(user => this.userService.get(user.uid).valueChanges()))
    .pipe(map(appUser => appUser.isAdmin));
  }
}
