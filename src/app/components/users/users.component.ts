import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { userModel } from 'src/app/models/userModel';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersList: Array<userModel>;
  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersList = [];
    this.usersService.getAllUsers().subscribe((res: Array<{}>) => {
      console.log(res);
      res.forEach((user: userModel) => {
        user.ordersCount = user.orders.length;
        this.usersList.push(user);
      });
      console.log(this.usersList);
    }, (err) => {
      console.log(err);
    });
  }
  getAllUsers() {

  }
}
