import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {orderModel} from '../models/orderModel';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = 'http://localhost:3000/api/orders/';

  constructor(private client:HttpClient) { }
  getAll(){
    let res =  this.client.get(this.baseUrl, {observe:'body'});
    return res;
  }
  getOrder(id){
    let res = this.client.get(this.baseUrl+id, {observe: 'body'});
    return res;    
  }
  updateOrder(id, order){
    let res =  this.client.patch(this.baseUrl+id, order,{observe:'body', responseType:'text'});
    return res;
  }

}
