import { Component, OnInit, Input } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { orderModel } from 'src/app/models/orderModel';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {
  userId: string;
  ordersList: Array<orderModel>;
  pendingList: Array<orderModel> = new Array<orderModel>();
  acceptedList: Array<orderModel> = new Array<orderModel>();
  rejectedList: Array<orderModel> = new Array<orderModel>();
  ordersCount;
  constructor(
    private activatedRoute: ActivatedRoute,
    private orderService: OrdersService,
    public userService: UsersService
  ) { }

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.ordersList = this.getUserOrders();
  }

  getUserOrders() {
    this.orderService.getUserOrders(this.userId).subscribe(
      (res: Array<orderModel>) => {
        console.log(res);
        this.ordersList = res;
        this.ordersCount = this.ordersList.length;
        for (let i = 0; i < this.ordersCount; i++) {
          this.ordersList[i].cost = this.calculateCost(this.ordersList[i]);
          switch (this.ordersList[i].status) {
            case "pending":
              this.pendingList.push(this.ordersList[i]);
              break;
            case "rejected":
              this.rejectedList.push(this.ordersList[i]);
              break;
            case "accepted":
              this.acceptedList.push(this.ordersList[i]);
              break;
          }
        }
      },
      err => {
        console.log(err);
      }
    )
    return this.ordersList;
  }
  calculateCost(order: orderModel) {
    let cost = 0
    order.products.forEach(item => {
      cost += item.Product.price * item.count;
    });
    return cost;
  }
  deleteOrder(order: orderModel) {
    let status = { status: "rejected" };
    this.updateOrder(order, status);
  }

  updateOrder(order, status) {
    var orderId = order._id;
    this.orderService.updateOrder(orderId, status).subscribe(
      (res: orderModel) => {
        order.status = status.status;
        console.log(res._id);
        console.log(orderId);
      },
      err => {
        console.log(err);
      }
    );
  }

}
