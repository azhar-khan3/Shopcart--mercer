import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private productService:ProductService) { }
  productData:any = [];
  productId:string="";

  ngOnInit(): void {
    this.getProduct();
  }


 async  getProduct(){
  //  this.productService.id.subscribe(res=>{
  //   this.customerId = res;
 
  //  })
   this.productId = sessionStorage.getItem("productId")!;
   let data= await this.productService.getOneProduct(this.productId).toPromise();
   this.productData = [data]
  }

}
