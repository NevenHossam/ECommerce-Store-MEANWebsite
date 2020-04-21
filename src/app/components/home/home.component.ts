import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  promotedProductsList;

  constructor(private prdService: ProductsService) {
    this.getPromotedProduts();
    console.log(this.promotedProductsList)
  }

  ngOnInit(): void {}

  getPromotedProduts(){
    this.prdService.getPromotedProducts().subscribe(res=>this.promotedProductsList = res, err=>console.log(err));
  }
}
