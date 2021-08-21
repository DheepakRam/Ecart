import { Component } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {

  orders$;

  constructor(authService: AuthService,orderService: OrderService) { 
      this.orders$ = authService.user$.pipe(switchMap(u => orderService.getOrdersByUser(u.uid).valueChanges()));
    }
}
