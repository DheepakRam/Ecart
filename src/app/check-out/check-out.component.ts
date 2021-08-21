import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit,OnDestroy {

  shipping={
    name:'',
    addressLine1:'',
    addressLine2:'',
    city:''
  };
  cart;
  subscription:Subscription;
  userSubscription:Subscription
  userId;
  shoppingCartItemCount;
  shoppingCartTotalPrice;

  constructor(private cartService:ShoppingCartService,
              private orderService:OrderService,
              private authService:AuthService,
              private router:Router) { }

  async ngOnInit(){
    let cart$ = await this.cartService.getCart();
    this.subscription = cart$.valueChanges().subscribe(c=>{
      this.shoppingCartItemCount=0;
      this.shoppingCartTotalPrice=0;
      this.cart=[];
      for(let id in c.items){
        this.shoppingCartItemCount+= c.items[id].quantity;
        this.shoppingCartTotalPrice+=(c.items[id].product.price*c.items[id].quantity);
        this.cart.push({title:c.items[id].product.title,
          imageUrl:c.items[id].product.imageUrl,
          price:c.items[id].product.price,
          quantity:c.items[id].quantity,
        totalPrice:c.items[id].product.price*c.items[id].quantity});
      }
    });
    this.userSubscription = this.authService.user$.subscribe(user=>this.userId = user.uid);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  async placeOrder(){
    let order={
      userId:this.userId,
      datePlaced: new Date().getTime(),
      shipping:this.shipping,
      items:this.cart.map(i=>{
        return{
          product:{
            title:i.title,
            imageUrl:i.imageUrl,
            price:i.price
          },
          quantity:i.quantity,
          totalPrice:i.totalPrice
        }
      })
    };
    let result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success',result.key]);
  }

}
