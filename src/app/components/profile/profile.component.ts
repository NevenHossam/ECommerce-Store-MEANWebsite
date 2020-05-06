import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { OrdersService } from 'src/app/services/orders.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser;
  ordersOfCurrentUser;

  constructor(
    private usersService: UsersService,
    private ordersService: OrdersService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.usersService.getCurrentUser();
    this.getOrdersOfUser();
  }

  getOrdersOfUser(){
    this.ordersService
      .getUserOrders(this.currentUser.userId)
      .subscribe(
        (res) => (this.ordersOfCurrentUser = res),
        (err) => console.log(err)
      );
  }
}
