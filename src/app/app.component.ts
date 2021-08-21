import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(auth:AuthService, router:Router,userService:UserService){
    auth.user$.subscribe(user =>{
      if(user){
        userService.save(user);
        let url = localStorage.getItem('returnUrl');
        if(url){
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(url);
        }
        
      }
    });
  }
}
