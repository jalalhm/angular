import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  products : Array<any> = [];
  constructor(private productService:ProductService) {

  }
  ngOnInit(): void {
   this.getProduct();
  }
  getProduct(){
    this.productService.getProduct()
      .subscribe({
          next: data =>
          {
            this.products=data
          },
          error : err => {
            console.log(err)
          }
        }
      )
  }

  handleCheckProduct(product: any) {
    this.productService.checkProduct(product).subscribe({
        next : updateProduct => {
          product.checked =!product.checked;
          //le seul produit qon a cheque
          }
         })
        }


}
