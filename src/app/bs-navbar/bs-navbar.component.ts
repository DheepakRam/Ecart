import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {

  appUser:AppUser
  shoppingCartItemCount:number;

  constructor(private auth:AuthService,private cartService:ShoppingCartService) {  
    auth.appUser$.subscribe(appUser=> this.appUser=appUser);
    
  }
  
  async ngOnInit(){
    (await this.cartService.getCart()).valueChanges().subscribe(cart => {
      this.shoppingCartItemCount = 0;  
      for(let productId in cart.items){
         this.shoppingCartItemCount+= cart.items[productId].quantity;
        }
    });
  }

  logout(){
    this.auth.logout();
  }

}
