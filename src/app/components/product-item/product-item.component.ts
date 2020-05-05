import { Component, OnInit, Input, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { productModel } from 'src/app/models/productModel';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @Input() product: productModel;
  prdsList;

  constructor(
    public prdService: ProductsService,
    public userService: UsersService
  ) { }

  ngOnInit(): void {
<<<<<<< HEAD
    if (!localStorage.getItem('shoppingCartProducts'))
      localStorage.setItem(
        'shoppingCartProducts',
        JSON.stringify(this.shoppingCartListOfProduct)
=======
    if (
      localStorage.getItem(this.prdService.localStorageName)?.length == 0 ||
      localStorage.getItem(this.prdService.localStorageName) == null
    )
      localStorage.setItem(
        this.prdService.localStorageName,
        JSON.stringify([])
>>>>>>> 5e891852d372939d2a42ec4d4ee3ed062f0897bf
      );
  }

  getPrice() {
    return this.product.promotion
      ? this.product.price - this.product.promotion
      : this.product.price;
  }
}
