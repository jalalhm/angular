import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  products : Array<Product>=  [];
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
   // this.products=this.productService.getProduct();
  }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
        next : updateProduct => {
          product.checked =!product.checked;
          //le seul produit qon a cheque
          }
         })
        }


  handleDelete(product: Product) {
    if (confirm("Ete vous sure pour supprimer"))
    this.productService.deleteProduct(product).subscribe({
      next : value=>{
        //this.getProduct();
        this.products.filter(p=>p.id!=product.id);
    }
    })
  }
}

