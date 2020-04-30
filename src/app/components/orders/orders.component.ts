import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { orderModel } from 'src/app/models/orderModel';
import {Router, ActivatedRoute} from '@angular/router';

// @Input() id:nu
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  ordersList :Array<orderModel>;
  ordersCount;
  orderCost;
  constructor(
    private service: OrdersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ordersList = this.getAllOrders();
  }

  getAllOrders(){
    this.service.getAll().subscribe(
      (res:Array<orderModel>) => {
        this.ordersList = res;
        console.log(this.ordersList);
        this.ordersCount = this.ordersList.length;
        for (let i = 0; i < this.ordersCount; i++) {
          let cost=0;
          this.ordersList[i].products.forEach(item => {
            cost+=item.Product.price * item.count;
          });
          this.ordersList[i].cost = cost;
        }
      },
      err=>{
          console.log(err);
      }
    )
    return this.ordersList;
  }

  confirmOrder(order:orderModel){
    // order.status = "accepted";
    let status= {status:"accepted"} ;
    this.updateOrder(order, status);
  }
  
  deleteOrder(order: orderModel){
    let status= {status:"rejected"} ;
    this.updateOrder(order, status);
  }
  
  updateOrder(order, status){
    debugger;
    this.service.updateOrder(order._id, status).subscribe(
      res=>{
        order.status = status.status;
        console.log(res);
      },
      err=>{
        console.log(err);
      }
    );
  }

 


}
