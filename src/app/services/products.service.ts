import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { productModel } from '../models/productModel';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  private baseUrl = 'http://localhost:3000/api/products';
  allProducts;
  shoppingCartListOfProducts = [];
  public localStorageName;

  constructor(private client: HttpClient, private userService: UsersService) {}

  ngOnInit() {
    this.shoppingCartListOfProducts = JSON.parse(
      localStorage.getItem(this.localStorageName)
    );
    if (this.shoppingCartListOfProducts.length == 0)
      localStorage.setItem(this.localStorageName, JSON.stringify([]));

    if (this.userService.getCurrentUser())
      this.localStorageName =
        'shoppingCartProducts' + this.userService.getCurrentUser().userId;
  }

  addToShoppingCart(prd: productModel) {
    this.shoppingCartListOfProducts = JSON.parse(
      localStorage.getItem(this.localStorageName)
    );
    this.shoppingCartListOfProducts.push(prd);
    localStorage.setItem(
      this.localStorageName,
      JSON.stringify(this.shoppingCartListOfProducts)
    );
  }
  clearShoppingCart(){
    this.shoppingCartListOfProducts=[];
    localStorage.setItem(this.localStorageName, JSON.stringify(this.shoppingCartListOfProducts));
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
    return this.client.post(this.baseUrl, prd, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    });
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
