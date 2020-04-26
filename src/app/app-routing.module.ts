import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsListComponent } from './components/products-list/products-list.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { SearchComponent } from './components/search/search.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { DeleteProductComponent } from './components/delete-product/delete-product.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'products', component: ProductsListComponent },
  { path: 'product/add', component: AddProductComponent },
  { path: 'product/edit/:id', component: EditProductComponent },
  { path: 'product/delete/:id', component: DeleteProductComponent },
  { path: 'contact', component: ContactUsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'shoppingCart', component: ShoppingCartComponent },
  { path: 'productDetails/:id', component: ProductDetailsComponent },
  { path: 'search/:name', component: SearchComponent },
  { path: 'orders', component:OrdersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
