import { Component, OnInit, Input, Output } from '@angular/core';
import {OrdersService} from 'src/app/services/orders.service';
import {orderModel} from 'src/app/models/orderModel';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  order: orderModel;
  products;

  constructor(
    private service: OrdersService,
    private route:ActivatedRoute
  ) {
    let orderId = this.route.snapshot.params['id']||0;
    this.order = this.getOrderById(orderId);
   }

  ngOnInit(): void {

  }

  getOrderById(id){
   this.service.getOrder(id).subscribe(
     (res:orderModel)=>{
        this.order = res;
        this.order.cost = this.calculateCost(this.order);
        this.products = this.order.products;
        console.log(this.products);
        debugger;
     },
     err=>{
        console.log(err);
     }
   ) 
   return this.order;
  }
  calculateCost(order:orderModel){
    let cost=0
    order.products.forEach(item => {
      cost+=item.Product.price * item.count;
    });
    return cost;
  }
}
