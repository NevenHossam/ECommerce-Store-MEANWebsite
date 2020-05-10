import { Component } from '@angular/core';
import { ProductsService } from './services/products.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ECommerceAngular';

  /**
   *
   */
  constructor(
    private prdService: ProductsService,
    private userService: UsersService
  ) {
    this.prdService.shoppingCartListOfProducts = this.prdService.getShoppingCartContent();
    this.prdService.shoppingCartTotalCost = this.prdService.getTotalCostOfCart();
    this.prdService.initLocalStorageName();

    userService.currentUserInfo = userService.getCurrentUser();

    if (
      this.prdService.shoppingCartListOfProducts == null ||
      prdService.shoppingCartListOfProducts.length == 0
    )
      this.prdService.shoppingCartListOfProducts = [];
    else
      this.prdService.shoppingCartListOfProducts.forEach((product) => {
        if (product.promotion)
          product.totalCost = product.price - product.promotion;
        else product.totalCost = product.price;
      });
  }
}
