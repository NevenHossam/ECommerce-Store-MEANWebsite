import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { orderModel } from 'src/app/models/orderModel';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  ordersList: Array<orderModel> = [];
  pendingList: Array<orderModel> = new Array<orderModel>();
  acceptedList: Array<orderModel> = new Array<orderModel>();
  rejectedList: Array<orderModel> = new Array<orderModel>();

  acceptedCount = 0;
  rejectedCount = 0;
  pendingCount = 0;

  ordersCount;
  orderCost;
  constructor(private service: OrdersService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.ordersList = this.getAllOrders();
    if (this.ordersList) {
      console.log(this.ordersList);
    }
  }

  getAllOrders() {
    this.service.getAll().subscribe(
      (res: Array<orderModel>) => {
        this.ordersList = res;
        this.ordersCount = this.ordersList.length;
        for (let i = 0; i < this.ordersCount; i++) {
          this.ordersList[i].cost = this.calculateCost(this.ordersList[i]);
          switch (this.ordersList[i].status) {
            case 'pending':
              this.pendingList.push(this.ordersList[i]);
              break;
            case 'rejected':
              this.rejectedList.push(this.ordersList[i]);
              break;
            case 'accepted':
              this.acceptedList.push(this.ordersList[i]);
              break;
          }
        }
      },
      (err) => {
        console.log(err);
      }
    );
    return this.ordersList;
  }

  calculateCost(order: orderModel) {
    let cost = 0;
    order.products.forEach((item) => {
      cost += item.Product.price * item.count;
    });
    return cost;
  }

  confirmOrder(order: orderModel) {
    let status = { status: 'accepted' };
    this.updateOrder(order, { status: 'accepted' });
  }

  deleteOrder(order: orderModel) {
    let status = { status: 'rejected' };
    this.updateOrder(order, status);
  }

  updateOrder(order, status) {
    var orderId = order._id;
    this.service.updateOrder(orderId, status).subscribe(
      (res: orderModel) => {
        order.status = status.status;
        // this.pendingList.slice(this.pendingList.indexOf(order), 1);
        switch (status.status) {
          case 'accepted':
            this.acceptedList.push(order);
            break;
          case 'rejected':
            this.rejectedList.push(order);
            break;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
