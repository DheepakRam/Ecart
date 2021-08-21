import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { take } from 'rxjs/operators';
import { Items } from '../models/items';
import { ShoppingCart } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }

  private create(){
    return this.db.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  async getCart():Promise<AngularFireObject<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-carts/'+cartId);
  }

  private async getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
     if(!cartId){
       let result = await this.create();
       localStorage.setItem('cartId',result.key);
       return result.key;
     }
     else{
       return cartId;
     }
  }

  private getItems(cartId,product):AngularFireObject<Items>{
    return this.db.object('/shopping-carts/'+cartId+'/items/'+product.key);
  }

  async addToCart(product){
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItems(cartId,product);
    items$.valueChanges().pipe(take(1)).subscribe(item =>{
      if(item){
        items$.update({quantity:item.quantity+1});
      }
      else{
        items$.set({product:product.payload.val(),quantity:1});
      }
    });
  }

  async removeFromCart(product){
    let cartId = await this.getOrCreateCartId();
    let items$ = this.getItems(cartId,product);
    items$.valueChanges().pipe(take(1)).subscribe(item =>{
      if(item){
        items$.update({quantity:item.quantity-1});
      }
      else{
        items$.set({product:product.payload.val(),quantity:1});
      }
    });
  }
  
  async clearCart(){
    let cartId = await this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+cartId+'/items/').remove();
  }

}
