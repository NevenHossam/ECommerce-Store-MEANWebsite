import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(
    private prdService: ProductsService,
    private activatedRouteObj: ActivatedRoute,
    private router: Router
  ) {
    this.prdName = activatedRouteObj.snapshot.params['name'];
  }

  ngOnInit(){}
  
  inputValueChanged(searchInputValue){
    this.searchQuery = searchInputValue;
    this.inputValueChangedEvent.emit(this.searchQuery);
  }
}
