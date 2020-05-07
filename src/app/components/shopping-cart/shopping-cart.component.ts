import { Component, OnInit, Output, Input } from '@angular/core';
import { productModel } from 'src/app/models/productModel';
import { ProductsService } from 'src/app/services/products.service';
import { orderModel } from 'src/app/models/orderModel';
import { OrdersService } from 'src/app/services/orders.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  @Input() shoppingCartListOfProducts = [];
  shoppingCartTotal = 0;
  orderCheckout: {
    user: string;
    products: [{}];
  };

  constructor(
    public prdService: ProductsService,
    private orderService: OrdersService,
    public userService: UsersService
  ) { }

  ngOnInit(): void {
    this.shoppingCartListOfProducts = JSON.parse(
      localStorage.getItem(this.prdService.localStorageName)
      );
      if(this.shoppingCartListOfProducts == null)
        this.shoppingCartListOfProducts=[];

    this.orderCheckout = {
      user: '5eabaa55cac73750843b4950',
      products: [{}],
    };
  }

  getTotalPriceOfShoppingCart() {
    this.shoppingCartTotal = 0;
    this.shoppingCartListOfProducts.forEach((prd) => {
      this.shoppingCartTotal += this.getFinalPriceForAproduct(prd);
    });
    return this.shoppingCartTotal;
  }

  getFinalPriceForAproduct(product: productModel) {
    return product.promotion
      ? product.price - product.promotion
      : product.price;
  }


  removeFromShoppingCart(prd: productModel) {
    this.shoppingCartListOfProducts = JSON.parse(
      localStorage.getItem(this.prdService.localStorageName)
    );
    let prdIndexToRemove = this.shoppingCartListOfProducts.findIndex(p => p._id == prd._id);
    this.shoppingCartListOfProducts.splice(prdIndexToRemove, 1);
    localStorage.setItem(this.prdService.localStorageName, JSON.stringify(this.shoppingCartListOfProducts));
  }
  
}
