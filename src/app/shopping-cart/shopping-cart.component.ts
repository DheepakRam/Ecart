import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit,OnDestroy {

  cart$;
  cartItems;
  shoppingCartItemCount:number;
  shoppingCartTotalPrice:number;
  products;
  filteredProduct;
  subscription:Subscription;

  constructor(private cartService:ShoppingCartService,private productService:ProductService) { }

  async ngOnInit(){
    this.cart$ = (await this.cartService.getCart());
    this.subscription = this.cart$.valueChanges().subscribe(cart => {
        this.cartItems=[];
        this.shoppingCartItemCount = 0;
        this.shoppingCartTotalPrice = 0;
        for(let productId in cart.items){
           this.shoppingCartItemCount+= cart.items[productId].quantity;
           this.shoppingCartTotalPrice+=(cart.items[productId].product.price*cart.items[productId].quantity);
           this.cartItems.push({title:cart.items[productId].product.title,
                                quantity:cart.items[productId].quantity,
                                price:cart.items[productId].product.price,
                                imageUrl:cart.items[productId].product.imageUrl});
          }
      });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  addToCart(product){
    this.cartService.addToCart(product);
  }

  removeFromCart(product){
   this.cartService.removeFromCart(product);
  }

  addToShoppingCart(itemTitle){
    this.productService.getAll().snapshotChanges().pipe(take(1)).subscribe(p=>{
      this.products = p;
      this.filteredProduct = this.products.filter(p=> p.payload.val().title == itemTitle)
      this.cartService.addToCart(this.filteredProduct[0]);
    });
  }

  removeFromShoppingCart(itemTitle){
    this.productService.getAll().snapshotChanges().pipe(take(1)).subscribe(p=>{
      this.products = p;
      this.filteredProduct = this.products.filter(p=> p.payload.val().title == itemTitle)
      this.cartService.removeFromCart(this.filteredProduct[0]);
    });
   }

   clearCart(){
     this.cartService.clearCart();
   }

}
