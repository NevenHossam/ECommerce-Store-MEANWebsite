import { Component, OnInit, Output, Input } from '@angular/core';
import { productModel } from 'src/app/models/productModel';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  @Input() shoppingCartListOfProducts: productModel[];
  shoppingCartTotal = 0;

  constructor(private prdService: ProductsService) {}

  ngOnInit(): void {
    this.shoppingCartListOfProducts = this.prdService.shoppingCartListOfProduct;
  }

  getTotalPriceOfShoppingCart() {
    this.shoppingCartTotal = 0;
    this.shoppingCartListOfProducts.forEach(prd => {
      this.shoppingCartTotal += this.getFinalPriceForAproduct(prd);
    });
    return this.shoppingCartTotal;
  }

  getProductFinalPrice(prd) {
    return this.getFinalPriceForAproduct(prd);
  }

  getFinalPriceForAproduct(product: productModel){
    return product.promotion ? product.price  - product.promotion : product.price;
  }
}
