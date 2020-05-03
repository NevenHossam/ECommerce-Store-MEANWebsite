import { Component, OnInit, EventEmitter } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  productsList;
  productsListLength;
  categoryName;
  showOptionNumber: number;

  constructor(private prdService: ProductsService, public userService: UsersService) {
    this.getPromotedProduts();
  }

  ngOnInit(): void {
    this.showOptionNumber = 12;
    this.productsList = this.getAllProducts();
  }

  getAllProducts() {
    this.prdService.getAllProducts().subscribe(
      (res) => {
        this.productsList = res;
        this.productsListLength = this.productsList.length;
        this.categoryName = 'All';
      },
      (err) => console.log(err)
    );
  }
  getWomenProducts() {
    this.prdService.getWomenProducts().subscribe(
      (res) => {
        this.productsList = res;
        this.productsListLength = this.productsList.length;
        this.categoryName = 'Women';
      },
      (err) => console.log(err)
    );
  }
  getMenProducts() {
    this.prdService.getMenProducts().subscribe(
      (res) => {
        this.productsList = res;
        this.productsListLength = this.productsList.length;
        this.categoryName = 'Men';
      },
      (err) => console.log(err)
    );
  }
  getChildrenProducts() {
    this.prdService.getChildrenProducts().subscribe(
      (res) => {
        this.productsList = res;
        this.productsListLength = this.productsList.length;
        this.categoryName = 'Children';
      },
      (err) => console.log(err)
    );
  }
  getPromotedProduts() {
    this.prdService.getPromotedProducts().subscribe(
      (res) => {
        this.productsList = res;
        this.productsListLength = this.productsList.length;
        this.categoryName = 'On Sale';
      },
      (err) => console.log(err)
    );
  }

  showChanged(num: number) {
    this.showOptionNumber = +num;
  }

  showMore() {
    this.showOptionNumber += +5;
  }
}
