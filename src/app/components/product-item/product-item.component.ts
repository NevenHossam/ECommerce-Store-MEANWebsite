import { Component, OnInit, Input, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { productModel } from 'src/app/models/productModel';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: productModel;
  prdsList;
  shoppingCartListOfProduct = [];

  constructor(private prdService: ProductsService) {}

  ngOnInit(): void {}

  getPrice() {
    return this.product.promotion
      ? this.product.price - this.product.promotion
      : this.product.price;
  }

  addProductToCart() {
    this.shoppingCartListOfProduct = JSON.parse(
      localStorage.getItem('shoppingCartProducts')
    );
    this.shoppingCartListOfProduct.push(this.product);
    localStorage.setItem(
      'shoppingCartProducts',
      JSON.stringify(this.shoppingCartListOfProduct)
    );
  }
}
