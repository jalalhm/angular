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
  public products : Array<Product>=  [];
  public keyword : string = ""
  public totalPages : number = 0;
  public PageSize : number = 3;
  public CurrentPage : number = 1;
  constructor(private productService:ProductService) {

  }
  ngOnInit(): void {
   this.getProduct();
  }
  getProduct(){
   this.productService.getProduct(this.CurrentPage,this.PageSize)
      .subscribe({
          next: (resp) =>
          {
            this.products=resp.body as Product[];
            let totalProducts: number = parseInt(resp.headers.get('x-total-count')!);
            //console.log(totalProducts)
            this.totalPages = Math.floor(totalProducts/this.PageSize);
            //console.log(this.totalPages);
            if (totalProducts % this.PageSize != 0)
            {
              this.totalPages = this.totalPages++;
            }
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

  searchProduct() {
    this.productService.searchProduct(this.keyword).subscribe({
      next : value => {
        this.products=value;
      }
    })
  }
}

