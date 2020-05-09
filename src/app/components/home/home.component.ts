import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  promotedProductsList;

  constructor(private prdService: ProductsService, private userService: UsersService) {
    this.getPromotedProduts();

    this.prdService.shoppingCartListOfProducts = this.prdService.getShoppingCartContent();
    // if (this.shoppingCartListOfProducts.length == 0)
    //   localStorage.setItem(this.localStorageName, JSON.stringify([]));
    if (this.userService.getCurrentUser()){
      this.prdService.localStorageName =
        'shoppingCartProducts' + this.userService.getCurrentUser().userId;
    }
    if (
      localStorage.getItem(this.prdService.localStorageName)?.length == 0 ||
      localStorage.getItem(this.prdService.localStorageName) == null
    )
      localStorage.setItem(
        this.prdService.localStorageName,
        JSON.stringify([])
      );
  }

  ngOnInit(): void {}

  getPromotedProduts(){
    this.prdService.getPromotedProducts().subscribe(res=>this.promotedProductsList = res, err=>console.log(err));
  }
}
