import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {orderModel} from '../models/orderModel';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = 'http://localhost:3000/api/';

  constructor(private client:HttpClient) { }
  getAll(){
    return  this.client.get(this.baseUrl+'orders/', {observe:'body'});
  }
  getOrder(id){
    return this.client.get(this.baseUrl+`orders/${id}`, {observe: 'body'});
  }
  updateOrder(id, order){
    return  this.client.patch(this.baseUrl+`orders/${id}`, order,{observe:'body'});
  }
  deleteOrder(id){
    return this.client.delete(this.baseUrl+`orders/${id}`, {observe: 'body'});
  }
  getUserOrders(id){
    return  this.client.get(this.baseUrl+`users/${id}/orders`,{observe:'body', responseType:'text'});
  }
}
