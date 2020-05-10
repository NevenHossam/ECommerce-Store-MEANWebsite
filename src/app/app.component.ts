import { Component } from '@angular/core';
import { ProductsService } from './services/products.service';

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
  constructor(private prdService: ProductsService) {
    this.prdService.shoppingCartListOfProducts = this.prdService.getShoppingCartContent();
    this.prdService.shoppingCartTotalCost = this.prdService.getTotalCostOfCart();
    this.prdService.initLocalStorageName();

    if (this.prdService.shoppingCartListOfProducts == null)
      this.prdService.shoppingCartListOfProducts = [];
    else
      this.prdService.shoppingCartListOfProducts.forEach((product) => {
        if (product.promotion)
          product.totalCost = product.price - product.promotion;
        else product.totalCost = product.price;
      });

    console.log(this.prdService.shoppingCartListOfProducts);
  }

}
