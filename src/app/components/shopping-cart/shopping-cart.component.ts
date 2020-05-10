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
  ) {
    this.shoppingCartTotal = this.prdService.getTotalCostOfCart();
  }

  ngOnInit(): void {
    this.shoppingCartListOfProducts = this.prdService.getShoppingCartContent();
    this.shoppingCartTotal = this.prdService.getTotalCostFromLocalStorage();

    if (this.shoppingCartListOfProducts == null)
      this.shoppingCartListOfProducts = [{}];

    this.orderCheckout = {
      user: '5eabaa55cac73750843b4950',
      products: [{}],
    };
  }

  // getTotalPriceOfShoppingCart() {
  // this.shoppingCartTotal = 0;
  // this.shoppingCartListOfProducts.forEach((prd) => {
  //   this.shoppingCartTotal += this.prdService.calculateTotalCostOfProduct(prd);
  // });
  // return this.shoppingCartTotal;
  // }

getTotalCart(){
  return this.prdService.getTotalCostOfCart();
}

  getFinalPriceForAproduct(product) {
    return product.promotion
      ? product.price - product.promotion
      : product.price;
  }

  removeFromShoppingCart(prd: productModel) {
    console.log('remove');
    // console.log(this.prdService.removeFromShoppingCart(prd))
    // console.log(prd)
    // this.prdService.removeFromShoppingCart(prd);
    // this.getTotalPriceOfShoppingCart();
    // return this.shoppingCartListOfProducts = this.prdService.getShoppingCartContent();
  }
}
