import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productModel } from '../models/productModel';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService implements OnInit {
  private baseUrl = 'http://localhost:3000/api/products';
  allProducts;
  shoppingCartListOfProducts = [];
  public localStorageName =
    'shoppingCartProducts' + this.userService.getCurrentUser().userId;

  constructor(private client: HttpClient, private userService: UsersService) {}

  ngOnInit() {
    this.shoppingCartListOfProducts = JSON.parse(
      localStorage.getItem(this.localStorageName)
    );
    if (this.shoppingCartListOfProducts.length == 0)
      localStorage.setItem(this.localStorageName, JSON.stringify([]));
  }

  addToShoppingCart(prd:productModel){
    this.shoppingCartListOfProducts = JSON.parse(
      localStorage.getItem(this.localStorageName)
    );
    this.shoppingCartListOfProducts.push(prd);
    localStorage.setItem(this.localStorageName, JSON.stringify(this.shoppingCartListOfProducts));
  }

  getAllProducts() {
    return this.client.get(this.baseUrl, { observe: 'body' });
  }
  getSpecificProduct(id) {
    return this.client.get(this.baseUrl + '/' + id, { observe: 'body' });
  }
  getWomenProducts() {
    return this.client.get(this.baseUrl + '/category/women', {
      observe: 'body',
    });
  }
  getMenProducts() {
    return this.client.get(this.baseUrl + '/category/men', { observe: 'body' });
  }
  getChildrenProducts() {
    return this.client.get(this.baseUrl + '/category/children', {
      observe: 'body',
    });
  }
  getProductByName(name: string) {
    return this.client.get(this.baseUrl + '/productName/' + name, {
      observe: 'body',
    });
  }
  getPromotedProducts() {
    return this.client.get(this.baseUrl + '/promoted', { observe: 'body' });
  }

  addNewProduct(prd: productModel) {
    return this.client.post(this.baseUrl, prd, { observe: 'body' });
  }

  editSpecificProduct(id, prd) {
    return this.client.patch(this.baseUrl + '/' + id, prd, { observe: 'body' });
  }

  deleteSpecificProduct(id) {
    return this.client.delete(this.baseUrl + '/' + id, { observe: 'body' });
  }
}
