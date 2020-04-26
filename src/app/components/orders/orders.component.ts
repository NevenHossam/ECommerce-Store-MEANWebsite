import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { orderModel } from 'src/app/models/orderModel';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders;
  constructor(
    private service: OrdersService,
    private  activatedRoute: ActivatedRoute,
    private route:Router
    ) { }

  private ordersModel;
  ngOnInit(): void {
    this.ordersModel = this.getOrders();
    console.log(this.ordersModel.Products[0].product);
  }
  getOrders( ){
    this.service.getAll().subscribe(
      (res) => {
        this.orders = res,
        console.log(res);
      },
      err => console.log(err)
      );
  }
}
