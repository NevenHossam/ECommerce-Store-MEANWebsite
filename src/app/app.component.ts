import { Component } from '@angular/core';
let x =6;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ECommerceAngular';
  
 constructor() {
  console.log(x);   
  x=9;
 }
  // ngOnDestroy(){
  //   console.log("Destroy");
  //   debugger;
  // }
}
