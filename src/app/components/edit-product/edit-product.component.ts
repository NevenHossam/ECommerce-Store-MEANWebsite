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
    category: '',
    isPromoted: 'false',
    details: '',
    image: null,
    price: 0,
    quantity: 0,
    promotion: 0,
    isDeleted: false,
    title: '',
  };
  @Input() productId;
  disabledFlag;
  imgPreview;

  constructor(
    private prdService: ProductsService,
    activatedRouteObj: ActivatedRoute,
    private router: Router
  ) {
    this.productId = activatedRouteObj.snapshot.params['id'] || '0';
    this.disabledFlag = this.product.isPromoted;
  }

  ngOnInit(): void {
    this.getProduct();
    this.imgPreview = this.product.image;
  }

  ngDoCheck() {
    if (this.product.isPromoted === 'true') this.disabledFlag = false;
    else this.disabledFlag = true;
  }

  getProduct() {
    this.prdService.getSpecificProduct(this.productId).subscribe(
      (res) => {
        this.product = res[0];
        this.imgPreview = this.product.image;
        console.log(this.product)
      },
      (err) => {
        if (err.status === 401 || err.status === 403)
          this.router.navigate['/login'];
      }
    );
  }

  submitEditedProduct() {
    if (this.product.price != 0 && this.product.title != '') {
      this.prdService
        .editSpecificProduct(this.productId, this.product)
        .subscribe(
          (res) => {
            this.product = res;
            this.router.navigate['/products'];
          },
          (err) => {
            if (err.status === 401 || err.status === 403)
              this.router.navigate['/login'];
          }
        );
      return true;
    } else return false;
  }

  selectCategory(cat: string) {
    this.product.category = cat;
  }

  // Image Preview
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.product.image = file;
    // this.form.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result as string;
      this.product.image = this.imgPreview;
      this.product.imageUrl = file.name;
    };
    reader.readAsDataURL(file);

    console.log(this.product);
  }

  removeImg() {
    console.log(this.product)
    this.product.imageUrl = '/assets/products/default-product-image.png';
    this.product.image = null;
    this.imgPreview = '';
  }
}
