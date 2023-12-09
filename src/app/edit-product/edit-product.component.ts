import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit{
  public productId! : number
  productFormGroup! : FormGroup
  constructor(private activatedRoute : ActivatedRoute, private productService : ProductService,
                private formBuilder : FormBuilder) {

  }
  ngOnInit() {
    this.productId = this.activatedRoute.snapshot.params["id"]; //prend une copie de url pour editer
    this.productService.getProductById(this.productId).subscribe({
      next: (product) => {
          this.productFormGroup=this.formBuilder.group({
            id : this.formBuilder.control(product.id),
            name : this.formBuilder.control(product.name,[Validators.required]),
            price : this.formBuilder.control(product.price.[Validators.min(100)]),
            checked : this.formBuilder.control(product.checked)
          })
      },

      error: err => {
        console.log(err);
      }
    });
  }
}
