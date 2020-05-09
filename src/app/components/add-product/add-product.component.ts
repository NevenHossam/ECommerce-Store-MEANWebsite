import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  DoCheck,
} from '@angular/core';
import { productModel } from 'src/app/models/productModel';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit, DoCheck {
  @Input() newProductObj: productModel = {
    category: 'men',
    isPromoted: 'false',
    details: '',
    image: null,
    price: 0,
    quantity: 0,
    promotion: 0,
    isDeleted: false,
    title: '',
  };
  @Output() isPromotedCheckEvent = new EventEmitter();
  disabledFlag: boolean = true;
  imgPreview;

  constructor(private prdService: ProductsService, private router: Router) {}

  ngOnInit() {}

  ngDoCheck() {
    if (this.newProductObj.isPromoted === 'true') this.disabledFlag = false;
    else this.disabledFlag = true;
  }

  selectCategory(cat: string) {
    this.newProductObj.category = cat;
  }

  addNewProduct() {
    if (this.newProductObj.price != 0 && this.newProductObj.title != '') {
      this.prdService.addNewProduct(this.newProductObj).subscribe(
        (res: productModel) => {
          this.newProductObj = res;
          this.router.navigate(['products']);
        },
        (err) => {
          if (err.status === 401 || err.status === 403)
            this.router.navigate['/login'];
        }
      );
      return true;
    } else return false;
  }

  // Image Preview
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.newProductObj.image = file;
    // this.form.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imgPreview = reader.result as string;
      this.newProductObj.image = this.imgPreview;
      this.newProductObj.imageUrl = file.name;
    };
    reader.readAsDataURL(file);
  }

  removeImg() {
    this.newProductObj.image = null;
    this.imgPreview = '';
  }

  cancelAddingProduct() {
    this.newProductObj = {};
  }
}
