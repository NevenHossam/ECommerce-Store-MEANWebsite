import { Injectable, OnInit } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { productModel } from '../models/productModel';
import { UsersService } from './users.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  private baseUrl = 'http://localhost:3000/api/products';
  allProducts;
  public shoppingCartListOfProducts = [{}];
  public localStorageName;

  constructor(private client: HttpClient, private userService: UsersService) {}

  ngOnInit() {
    this.shoppingCartListOfProducts = this.getShoppingCartContent();
    if (this.shoppingCartListOfProducts.length == 0)
      localStorage.setItem(this.localStorageName, JSON.stringify([]));

    if (this.userService.getCurrentUser())
      this.localStorageName =
        'shoppingCartProducts' + this.userService.getCurrentUser().userId;
  }

  setToShoppingCart() {
    localStorage.setItem(
      this.localStorageName,
      JSON.stringify(this.shoppingCartListOfProducts)
    );
  }
  getShoppingCartContent() {
    return JSON.parse( localStorage.getItem(this.localStorageName) );
  }   

addToShoppingCart(prd: productModel) {
    this.shoppingCartListOfProducts = this.getShoppingCartContent();
    this.shoppingCartListOfProducts.push(prd);
    this.setToShoppingCart();
    return this.getShoppingCartContent();
}
  clearShoppingCart(){
    this.shoppingCartListOfProducts=[];
    this.setToShoppingCart();
    return this.shoppingCartListOfProducts;
  }
  removeFromShoppingCart(prd: productModel) {
    console.log("delete from service");
    this.getShoppingCartContent();
    debugger;
    let prdIndexToRemove = this.shoppingCartListOfProducts.findIndex((p:productModel) => p._id == prd._id);
    this.shoppingCartListOfProducts.splice(prdIndexToRemove, 1);
    this.setToShoppingCart();
    return this.shoppingCartListOfProducts;
  }
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
    return this.client.get(this.baseUrl + '/productName/', {
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
    return this.client.post(
      this.baseUrl,
      // { 'prd': { ...prd }, 'prdImage': prdImage },
      prd,
      {
        reportProgress: true,
        // observe: 'events',
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: token,
        }),
      }
    );
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
    return this.client.post(this.baseUrl + '/' + id, prd, {
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
