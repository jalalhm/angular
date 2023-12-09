import {Component, OnInit} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products!: Array<Product>;
  keyword: any = "";
  totalPages: number = 3;
  PageSize: number = 2;
  currentPage: number = 1; // Corrected the initial page to 1

  constructor(private productService: ProductService, private router : Router) {}

  ngOnInit() {
    this.searchProduct();
  }

  searchProduct() {
    this.productService.searchProduct(this.keyword, this.currentPage, this.PageSize)
      .subscribe({
        next: (resp) => {
          this.products = resp.body as Product[];
          let totalProducts: number = parseInt(resp.headers.get('x-total-count')!);
          this.totalPages = Math.floor(totalProducts / this.PageSize);
          if (totalProducts % this.PageSize !== 0) {
            this.totalPages = this.totalPages + 1;
          }
        },
        error: err => {
          console.log(err);
        }
      });
  }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next: updateProduct => {
        product.checked = !product.checked;
        // the only product that has been checked
      }
    });
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

  handleGoToPage(page: number) {
    this.currentPage = page;
    this.searchProduct();
  }

  handleEdit(product: Product) {
    this.router.navigateByUrl(`editproduct/${product.id}`)
  }
}
