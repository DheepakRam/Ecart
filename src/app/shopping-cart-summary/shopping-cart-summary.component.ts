import { Component, Input } from '@angular/core';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent {

  @Input('cart') cart;
  @Input('totalCount') totalCount;
  @Input('totalPrice') totalPrice;
  constructor() { }


}
