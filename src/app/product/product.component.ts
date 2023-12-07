import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  products! : Array<Product>;
  keyword: any = '';
  totalPages: number=3;
  PageSize: number=3;
  currentPage: number=1;
  constructor(private productService:ProductService) {

  }
  ngOnInit(): void {
   this.searchProduct();
  }
  getProduct(){
   this.productService.getProduct(this.currentPage,this.PageSize)
      .subscribe({
          next: (resp) =>
          {
            this.products=resp.body as Product[];
            let totalProducts: number = parseInt(resp.headers.get('x-total-count')!);
            this.totalPages = Math.floor(totalProducts/this.PageSize);
            if (totalProducts % this.PageSize != 0)
            {
              this.totalPages = this.totalPages+1;
            }
          },
          error : err => {
            console.log(err)
          }
        }
      )
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
    if (confirm("Êtes-vous sûr de vouloir supprimer?")) {
      this.productService.deleteProduct(product).subscribe({
        next: value => {
          this.products = this.products.filter(p => p.id != product.id);
        }
      });
    }
  }

  searchProduct() {
    this.productService.searchProduct(this.keyword).subscribe({
      next : value => {
        this.products=value;
      }
    });
  }

  handleGoToPage(page : number){
      this.currentPage=page;
      this.getProduct();
  }
}

