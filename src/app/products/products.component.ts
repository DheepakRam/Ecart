import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { CategoryService } from '../services/category.service';
import { Products } from '../models/products';
import { ProductService } from '../services/product.service';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy{

  products;
  filteredProducts;
  categories$;
  category;
  @Input('shopping-cart')shoppingCart;
  cart;
  subscription:Subscription;

  constructor(productService:ProductService,categoryService:CategoryService,route:ActivatedRoute,private cartService:ShoppingCartService) {
    productService.getAll().snapshotChanges().pipe(take(1)).subscribe(p=>{
       this.products = p;
       route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category)? this.products.filter(p=> p.payload.val().category == this.category): this.products;
      });
      });
    this.categories$ = categoryService.getCategories().snapshotChanges();
   }

   addToCart(product){
     this.cartService.addToCart(product);
   }

   removeFromCart(product){
    this.cartService.removeFromCart(product);
   }

   getQuantity(product){
     if(this.cart === undefined || this.cart.items === undefined){
       return 0;
     }
     else{
      if(product.key!=undefined){
        let item = this.cart.items[product.key];
        if(item!=undefined){
          return item.quantity;
        }
        else{
          return 0;
        }
      }
     }
    
   }

   async ngOnInit(){
     this.subscription = (await this.cartService.getCart()).valueChanges().subscribe(cart => this.cart = cart);
   }

   ngOnDestroy(){
     this.subscription.unsubscribe();
   }
    
}
