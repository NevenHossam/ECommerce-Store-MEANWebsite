import { Component, OnInit, Input, DoCheck, OnChanges } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnChanges {
  productsList;
  prdName;

  constructor(
    private prdService: ProductsService,
    private activatedRouteObj: ActivatedRoute,
    private router: Router
  ) {
    this.prdName = activatedRouteObj.snapshot.params['name'];
    this.productsList = this.getProductDetails(this.prdName);
  }

  ngOnChanges() {
    this.prdName = this.activatedRouteObj.snapshot.params['name'];
    this.getProductDetails(this.prdName);
  }

  ngOnInit(): void {
    this.productsList = this.getProductDetails(this.prdName);
  }

  getProductDetails(name) {
    this.prdService.getProductByName(this.prdName).subscribe(
      (res) => {
        console.log(this.productsList);
        this.productsList = res;
      },
      (err) => console.log(err)
    );
  }
}
