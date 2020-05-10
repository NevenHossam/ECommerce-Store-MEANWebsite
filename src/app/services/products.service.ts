import { Injectable, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { productModel } from '../models/productModel';
import { UsersService } from './users.service';
import { throwError } from 'rxjs';
import { orderModel } from '../models/orderModel';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  private baseUrl = 'http://localhost:3000/api/products';
  allProducts;
  public shoppingCartListOfProducts = [];
  public localStorageName;
  public localStorageCartCost;
  public shoppingCartTotalCost = 0;

  constructor(private client: HttpClient, private userService: UsersService) {}

  ngOnInit() {}

  //Shopping Cart
  initLocalStorageName() {
    if (this.userService.getCurrentUser()) {
      this.localStorageName =
        'shoppingCartProducts' + this.userService.getCurrentUser().userId;
      this.localStorageCartCost =
        'shoppingCartProductsTotalCost' +
        this.userService.getCurrentUser().userId;
    }
    if (
      localStorage.getItem(this.localStorageName)?.length == 0 ||
      localStorage.getItem(this.localStorageName) == null
    ) {
      localStorage.setItem(this.localStorageName, JSON.stringify([]));
      localStorage.setItem(this.localStorageCartCost, JSON.stringify(0));
    }
  }

  setToShoppingCart() {
    if (this.shoppingCartListOfProducts?.length == 0) {
      localStorage.setItem(this.localStorageName, JSON.stringify([]));
      localStorage.setItem(this.localStorageCartCost, JSON.stringify(0));
    } else {
      localStorage.setItem(
        this.localStorageName,
        JSON.stringify(this.shoppingCartListOfProducts)
      );
      localStorage.setItem(
        this.localStorageCartCost,
        JSON.stringify(this.getTotalCostOfCart())
      );
    }
  }
  getShoppingCartContent() {
    return JSON.parse(localStorage.getItem(this.localStorageName));
  }
  addToShoppingCart(prd) {
    this.shoppingCartListOfProducts = this.getShoppingCartContent();
    this.shoppingCartTotalCost = this.getTotalCostFromLocalStorage();
    if (this.shoppingCartListOfProducts) {
      let searchFor = this.shoppingCartListOfProducts.find(
        (p: orderModel) => p._id === prd._id
      );
      if (searchFor) {
        console.log(searchFor);
        this.shoppingCartListOfProducts.forEach((p) => {
          if (p === searchFor) {
            p.count++;
            p.totalCost = this.calculateTotalCostOfProduct(p);
          }
        });
      } else {
        prd.count = 1;
        prd.totalCost = this.calculateTotalCostOfProduct(prd);
        this.shoppingCartListOfProducts.push(prd);
      }
    } else {
      prd.count = 1;
      prd.totalCost = this.calculateTotalCostOfProduct(prd);
      this.shoppingCartListOfProducts.push(prd);
    }

    this.setToShoppingCart();
    this.shoppingCartListOfProducts = this.getShoppingCartContent();
    this.shoppingCartTotalCost = this.getTotalCostFromLocalStorage();

    return this.shoppingCartListOfProducts;
  }
  calculateTotalCostOfProduct(prd) {
    if (prd.promotion) prd.totalCost = (prd.price - prd.promotion) * prd.count;
    else prd.totalCost = prd.price * prd.count;
    console.log(prd.totalCost);
    return prd.totalCost;
  }
  clearShoppingCart() {
    this.shoppingCartListOfProducts = [];
    this.setToShoppingCart();
    return this.shoppingCartListOfProducts;
  }
  removeFromShoppingCart(prd: productModel) {
    console.log('delete from service');
    this.shoppingCartListOfProducts = this.getShoppingCartContent();
    this.shoppingCartTotalCost = this.getTotalCostOfCart();
    let prdIndexToRemove = this.shoppingCartListOfProducts.findIndex(
      (p: productModel) => p._id == prd._id
    );
    this.shoppingCartListOfProducts.splice(prdIndexToRemove, 1);
    this.setToShoppingCart();
    return this.shoppingCartListOfProducts;
  }
  getTotalCostOfCart() {
    this.shoppingCartTotalCost = 0;
    if (this.shoppingCartListOfProducts?.length > 0)
      this.shoppingCartListOfProducts.forEach((prd) => {
        this.shoppingCartTotalCost += this.calculateTotalCostOfProduct(prd);
      });
    return this.shoppingCartTotalCost;
  }
  setTotalCostIntoLocalStorage() {
    if (this.shoppingCartListOfProducts?.length > 0)
      localStorage.setItem(this.localStorageCartCost, JSON.stringify(0));
    localStorage.setItem(
      this.localStorageName,
      JSON.stringify(this.shoppingCartListOfProducts)
    );
  }
  getTotalCostFromLocalStorage() {
    return JSON.parse(localStorage.getItem(this.localStorageCartCost));
  }
  resetCart(){
    localStorage.setItem(this.localStorageCartCost, JSON.stringify(0));
    localStorage.setItem(this.localStorageName, JSON.stringify([]));
  }

  //Products
  getAllProducts() {
    let token = localStorage.getItem('token');
    return this.client.get(this.baseUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }
  getSpecificProduct(id) {
    let token = localStorage.getItem('token');
    return this.client.get(this.baseUrl + '/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }
  getWomenProducts() {
    let token = localStorage.getItem('token');
    return this.client.get(this.baseUrl + '/category/women', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }
  getMenProducts() {
    let token = localStorage.getItem('token');
    return this.client.get(this.baseUrl + '/category/men', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }
  getChildrenProducts() {
    let token = localStorage.getItem('token');
    return this.client.get(this.baseUrl + '/category/children', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }
  getProductByName(name: string) {
    let token = localStorage.getItem('token');
    return this.client.get(this.baseUrl + '/productName/' + name, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }
  getPromotedProducts() {
    return this.client.get(this.baseUrl + '/promoted', { observe: 'body' });
  }

  addNewProduct(prd: productModel) {
    let token = localStorage.getItem('token');
    return this.client.post(this.baseUrl, prd, {
      reportProgress: true,
      // observe: 'events',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }
  // Error handling
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

  editSpecificProduct(id, prd) {
    let token = localStorage.getItem('token');
    return this.client.patch(this.baseUrl + '/' + id, prd, {
      observe: 'body',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }

  deleteSpecificProduct(id) {
    let token = localStorage.getItem('token');
    return this.client.delete(this.baseUrl + '/' + id, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
  }
}
