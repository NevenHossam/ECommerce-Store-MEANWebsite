import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { productModel } from 'src/app/models/productModel';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() searchQuery;
  @Output() inputValueChangedEvent = new EventEmitter();

  productsList;
  prdName;

  userId = this.userService.getCurrentUser().userId;

  constructor(
    private prdService: ProductsService,
    private activatedRouteObj: ActivatedRoute,
    private router: Router,
    public userService: UsersService
  ) {
    this.prdName = activatedRouteObj.snapshot.params['name'];
  }

  ngOnInit(){}
  
  inputValueChanged(searchInputValue){
    this.searchQuery = searchInputValue;
    this.inputValueChangedEvent.emit(this.searchQuery);
  }
}
