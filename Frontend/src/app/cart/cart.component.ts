import { Component, OnInit } from '@angular/core';
import { BreadcrumbModule } from 'angular-bootstrap-md';
import { NotificationService } from '../notification.service';
import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public products = [];
  cartNumber: number = 0;
  alltotal: number = 0;
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes = [3, 6, 9, 12];

  constructor(private cartService: CartService, private notifyService: NotificationService,
    private check: CheckoutService) { }

  showToasterSuccess() {
    this.notifyService.showSuccess("Item Added to Cart !!", "OK");
  }

  ngOnInit(): void {
    this.grandtotal()
    this.cartDetails()
    this.cartNumberFun();
    this.getDetail(this.getCartDetails);
    // this.cartService.getProducts()
    // .subscribe(res=>{

    //   this.products = res;
    //   this.grandTotal = this.cartService.getTotalPrice();
    // })
  }

  inc(id: any, quantity: any) {
    // console.log(prod);
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i]._id === id) {
        if (quantity != 7)
          this.getCartDetails[i].quantity = parseInt(quantity) + 1;
        this.getCartDetails[i].total = this.getCartDetails[i].price * this.getCartDetails[i].quantity;
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.cartNumberFun();
    this.grandtotal();
  }


  dec(id: any, quantity: any) {
    // console.log(prod);
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i]._id === id) {
        if (quantity != 1)
          this.getCartDetails[i].quantity = parseInt(quantity) - 1;
        this.getCartDetails[i].total = this.getCartDetails[i].price * this.getCartDetails[i].quantity;
      }
 }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.cartNumberFun();
    this.grandtotal();
  }


  grandtotal() {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!);
      this.alltotal = this.getCartDetails.reduce(function (acc: any, val: any) {
        return acc + (val.price * val.quantity)
      }, 0)
    }
  }

  getCartDetails: any = [];
  cartDetails() {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!);
      console.log(this.getCartDetails)
    }
  }

  removeItem(getCartDetail: any) {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!);
      // let index: number = this.getCartDetails.indexOf(getCartDetail);
      for (let i = 0; i < this.getCartDetails.length; i++) {

        console.log("in the loop", this.getCartDetails.length);
        if (this.getCartDetails[i].id === getCartDetail) {
          this.getCartDetails.splice(i, 1);
          localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
          this.cartNumberFun();
          this.grandtotal();
          this.cartDetails();
          break;
        }
        console.log("outer loop", this.getCartDetails.length);
      }
    }
  }


  emptycart() {
    // this.cartService.removeAllCart();
    localStorage.removeItem('localCart');
    this.getCartDetails = [];
    this.cartDetails();
    this.cartNumber = 0;
    this.alltotal = 0;
    this.cartService.cartSubject.next(this.cartNumber);
  }

  ///all cart details
  getDetail(getCartDetail: any) {
    this.check.getCartDetails = getCartDetail;
    console.log(getCartDetail)
  }

  cartNumberFun() {
    this.cartNumber = 0;
    for (let i = 0; i < this.getCartDetails.length; i++) {
      this.cartNumber += this.getCartDetails[i].quantity;
    }
    // this.cartNumber = cartValue.length;
    // console.log(this.cartNumber)
    this.cartService.cartSubject.next(this.cartNumber);
  }

}

