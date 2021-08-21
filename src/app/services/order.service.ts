import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ShoppingCartService } from './shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase,private cartService:ShoppingCartService) { }

  async storeOrder(order){
    let result = await this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  getOrders(){
    return this.db.list('/orders');
  }

  getOrdersByUser(userId) {
    return this.db.list('/orders', ref=>{
      return ref.orderByChild('userId').equalTo(userId)
    });
  }

}
