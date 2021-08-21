import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Products } from '../models/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db:AngularFireDatabase) { }

  create(product){
    return this.db.list('/products').push(product);
  }

  getAll():AngularFireList<Products>{
    return this.db.list('/products');
  }

  get(productId):AngularFireObject<Products>{
    return this.db.object('/products/'+productId);
  }

  update(product,productId){
    return this.db.object('/products/'+productId).update(product);
  }

  delete(productId){
    return this.db.object('/products/'+productId).remove();
  }

}
