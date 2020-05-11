import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { userModel } from 'src/app/models/userModel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usersList: Array<userModel>;
  
  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.usersList = [];
    this.usersService.getAllUsers().subscribe(
      (res: Array<{}>) => {
        console.log(res);
        res.forEach((user: userModel) => {
          user.ordersCount = user.orders.length;
          this.usersList.push(user);
        });
        console.log(this.usersList);
      },
      (err) => {
        if (err.status === 401 || err.status === 403) {
          location.replace('/login');
          this.router.navigate['/login'];
        }
      }
    );
  }
}
