import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { OrdersService } from 'src/app/services/orders.service';
import { userModel } from 'src/app/models/userModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser;
  userImgPreview;
  userData: userModel = {
    email: '',
    gender: '',
    password: '',
    role: '',
    username: '',
    imageUrl: '',
  };
  imgObj;

  constructor(
    private usersService: UsersService,
    private ordersService: OrdersService
  ) {
    this.currentUser = this.usersService.getCurrentUser();
  }

  ngOnInit(): void {
    this.userData.email = this.currentUser.userEmail;
    this.userData.gender = this.currentUser.userGender;
    this.userData.imageUrl = this.currentUser.userImage;
    this.userData.image = this.currentUser.userImage;
    this.userData.role = this.currentUser.role;
    this.userData.username = this.currentUser.userName;
    this.userData.password = this.currentUser.userPassword;
    // this.userData._id = this.currentUser.userId;

    this.getUserInfoFromDb();
  }

  getUserInfoFromDb() {
    this.usersService.getUserById(this.currentUser.userId).subscribe(
      (res: userModel) => {
        this.userData = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Image Preview
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.userData.image = file;
    // this.form.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.userImgPreview = reader.result as string;
      // this.imgObj = { image: this.userImgPreview, imageUrl: file.name };

      this.userData.image = this.userImgPreview;
      this.userData.imageUrl = file.name;
      console.log('upload');
      console.log(this.userData.image);
      console.log(this.userData.imageUrl);
    };
    reader.readAsDataURL(file);
    this.updateUserImg();
  }

  updateUserImg() {
    console.log(this.userData);
    this.usersService
      .updateUserInfo(this.currentUser.userId, this.userData)
      .subscribe(
        (res: userModel) => {
          this.userData = res;
          console.log('res succeeded');
        },
        (err) => {
          console.log('failed');
          console.log(this.userData);
          console.log(err);
        }
      );
  }
}
