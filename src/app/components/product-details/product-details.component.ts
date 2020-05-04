import { Component, OnInit, Input } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  @Input() productId;
  product;

  constructor(
    public prdService: ProductsService,
    activatedRouteObj: ActivatedRoute,
    private router: Router,
    public userService: UsersService
  ) {
    this.productId = activatedRouteObj.snapshot.params['id'] || 0;
    this.product = this.getProductDetails();
  }

  ngOnInit(): void {
    this.product = this.getProductDetails();
  }

  getProductDetails() {
    this.prdService.getSpecificProduct(this.productId).subscribe(
      res => {this.product = res[0]},
      err => console.log(err)
    );
  }

  getPrice(){
    return this.product.promotion ? this.product.price - this.product.promotion : this.product.price
  }

  // addProductToCart() {
  //   this.shoppingCartListOfProduct = JSON.parse(
  //     localStorage.getItem('shoppingCartProducts')
  //   );
  //   this.shoppingCartListOfProduct.push(this.product);
  //   localStorage.setItem(
  //     'shoppingCartProducts',
  //     JSON.stringify(this.shoppingCartListOfProduct)
  //   );
  // }

}
