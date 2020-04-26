import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {orderModel} from '../models/orderModel';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = 'http://localhost:3000/api/orders';

  constructor(private client:HttpClient) { }
  getAll(){
    let res =  this.client.get(this.baseUrl, {observe:'body'});
    debugger;
    return res;
  }

}
