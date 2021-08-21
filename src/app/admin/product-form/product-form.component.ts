import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { Products } from 'src/app/models/products';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  id;  
  categories$;
  product:Products={
    category:"",
    imageUrl:"",
    price:0,
    title:"",
  };

  constructor(categoryService:CategoryService,
    private productService:ProductService,
    private router:Router,
    private route:ActivatedRoute) {
    this.categories$ = categoryService.getCategories().snapshotChanges();
    this.id = this.route.snapshot.paramMap.get('id');
    if(this.id){
      this.productService.get(this.id).valueChanges().pipe(take(1)).subscribe(p => this.product = p);
    }
   }

  ngOnInit(): void {
  }

  save(product){

    if(this.id){
      this.productService.update(product,this.id);
    }
    else{
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']); 
  }

  delete(){
    if(confirm('Are you sure you want to delete this product?')){
        this.productService.delete(this.id);
        this.router.navigate(['/admin/products']);
    }
    else{
      return;
    }
  }

}
