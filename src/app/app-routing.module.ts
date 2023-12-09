import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { NewProductComponent } from './New-product/new-product.component';
import {EditProductComponent} from "./edit-product/edit-product.component";

const routes: Routes = [
  {path : "home" , component: HomeComponent},
      //https:localhost:4200/home
      {path : "product" , component: ProductComponent},
      {path : "newproduct" , component:NewProductComponent },
      {path : "editproduct/:id" , component:EditProductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
