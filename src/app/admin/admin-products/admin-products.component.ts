import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  
  products;
  filteredProducts;
  subscription:Subscription;

  constructor(private productService:ProductService) {
    this.subscription = this.productService.getAll().snapshotChanges().subscribe(p=> this.filteredProducts = this.products = p);
   }

  ngOnInit(): void {
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  filter(query){
    this.filteredProducts = (query)? 
      this.products.filter(p=> p.payload.val().title.toLowerCase().includes(query.toLowerCase())): this.products;
  }

}
