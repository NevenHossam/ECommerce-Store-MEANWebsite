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
    image: '',
    price: 0,
    quantity: 0,
    promotion: 0,
    isDeleted: false,
    title: '',
  };
  @Output() isPromotedCheckEvent = new EventEmitter();
  disabledFlag: boolean = true;

  constructor(private prdService: ProductsService) {}

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
        (res) => (this.newProductObj = {}),
        (err) => {
          if (err.status === 401 || err.status === 403)
            location.replace('/login');
        }
      );
      return true;
    } else return false;
  }

  cancelAddingProduct() {
    this.newProductObj = {};
  }
}
