import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { productModel } from '../models/productModel';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'http://localhost:3000/api/products';
  allProducts;

  constructor(private client: HttpClient) {}

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
  getPromotedProducts(){
    return this.client.get(this.baseUrl + '/promoted', {observe:'body'});
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
