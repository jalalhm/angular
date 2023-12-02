import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    actions : Array<any> = [
      {title : "home" , "route":"/home",icon : "house"},
      {title : "Products" , "route":"/product",icon : "search"},
      {title : "New Products" , "route":"/newproduct",icon : "safe"},
    ]

  currentAction : any
  serCurrentAction(action: any) {
      this.currentAction = action;
  }
}
