import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  products : Array<any> = [];
  constructor(private http : HttpClient) {

  }
  ngOnInit(): void {
    this.http.get<Array<any>>("http://localhost:8089/products")
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
    this.http.patch("http://localhost:8089/products/"+product.id , {checked:!product.checked})
    product.checked=!product.checked;
  }


}
