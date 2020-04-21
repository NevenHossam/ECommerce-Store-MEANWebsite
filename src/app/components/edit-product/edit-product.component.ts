import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { productModel } from 'src/app/models/productModel';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit, DoCheck {
  @Input() product: productModel = {
    category: 'men',
    isPromoted: 'false',
    details: '',
    image: '',
    price: 0,
    quantity: 0,
    promotion: 0,
    isDeleted: false,
    title: '',
  };;
  @Input() productId;
  disabledFlag;

  constructor(
    private prdService: ProductsService,
    activatedRouteObj: ActivatedRoute,
    private router: Router
  ) {
    this.productId = activatedRouteObj.snapshot.params['id'] || '0';
    this.getProduct();
    this.disabledFlag = this.product.isPromoted;
  }

  ngOnInit(): void {}

  ngDoCheck() {
    if (this.product.isPromoted === 'true') this.disabledFlag = false;
    else this.disabledFlag = true;
  }

  getProduct() {
    this.prdService.getSpecificProduct(this.productId).subscribe(
      (res) => (this.product = res[0]),
      (err) => console.log(err)
    );
  }

  submitEditedProduct() {
    if (this.product.price != 0 && this.product.title != '') {
      this.prdService
        .editSpecificProduct(this.productId, this.product)
        .subscribe(
          (res) => console.log(res),
          (err) => console.log(err)
        );
      return true;
    } else return false;
  }

  selectCategory(cat: string) {
    this.product.category = cat;
  }
}
