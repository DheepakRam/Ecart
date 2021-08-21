import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';
import { environment } from 'src/environments/environment';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminAuthGuardService } from './admin/services/admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ShoppingCartSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    CustomFormsModule,
    RouterModule.forRoot([
      {path:'',component:ProductsComponent},
      {path:'products',component:ProductsComponent},
      {path:'shopping-cart',component:ShoppingCartComponent},
      {path:'login',component:LoginComponent},
      {path:'check-out',component:CheckOutComponent, canActivate:[AuthGuardService]},
      {path:'order-success/:id',component:OrderSuccessComponent, canActivate:[AuthGuardService]},
      {path:'admin/products/new',component:ProductFormComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},
      {path:'admin/products/:id',component:ProductFormComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},
      {path:'admin/products',component:AdminProductsComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},
      {path:'admin/orders',component:AdminOrdersComponent, canActivate:[AuthGuardService,AdminAuthGuardService]},
      {path:'my/orders',component:MyOrdersComponent, canActivate:[AuthGuardService]}
    ]),
    AngularFireModule.initializeApp(environment.fireBase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
