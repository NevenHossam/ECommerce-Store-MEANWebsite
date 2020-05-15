import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  promotedProductsList;


  constructor(
    private prdService: ProductsService,
    private userService: UsersService
  ) {
    this.getPromotedProduts();
    // debugger;
    this.prdService.initLocalStorageName();
    this.prdService.shoppingCartListOfProducts = this.prdService.getShoppingCartContent();
    this.prdService.shoppingCartTotalCost = this.prdService.getTotalCostOfCart();
    // debugger;
    userService.currentUserInfo = this.userService.getCurrentUser();
    // debugger;
    if (
      this.prdService.shoppingCartListOfProducts == null ||
      this.prdService.shoppingCartListOfProducts.length == 0
    )
      this.prdService.shoppingCartListOfProducts = [];
    else
      this.prdService.shoppingCartListOfProducts.forEach((product) => {
        if (product.promotion)
          product.totalCost = product.price - product.promotion;
        else product.totalCost = product.price;
      });
      // debugger;
    }



  ngOnInit(): void {}

  getPromotedProduts() {
    this.prdService.getPromotedProducts().subscribe(
      (res) => (this.promotedProductsList = res),
      (err) => console.log(err)
    );
  }
}
