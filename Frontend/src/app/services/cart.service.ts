import { JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { NotificationService } from '../notification.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public totalItem: number = 0;
  itemsCart: any = [];
  cartItemList: any = [];
  //  cartItemList = {};
  cartSubject = new Subject<any>();


  public productList = new BehaviorSubject<any>([]);
  // public productList : any = [];
  public search = new BehaviorSubject<string>("");
  deleteBook$ = new Subject<{ id: string }>();
  
  constructor() { }
 
  addCart(product: any) {
    let cardDataNull = localStorage.getItem('localCart');
    if (cardDataNull === null) {
      let storeDataGet: any = [];
      storeDataGet.push(product);
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));

    }
    else {
      var id = product._id;
      let index: number = this.cartItemList.indexOf(product);
      // let index:number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localCart')!);
      for (let i = 0; i < this.itemsCart.length; i++) {
        if (id === this.itemsCart[i]._id) {
          this.itemsCart[i].quantity += product.quantity;
          index = i;
          // console.log("Item has already existed");
          break;
        }
      }

      if (index == -1) {
        this.itemsCart.push(product);
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
      else {
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
    }
    this.cartNumberFun();
  }


  cartNumber: number = 0;
  cartNumberFun() {
    var cartValue = JSON.parse(localStorage.getItem('localCart')!);
    this.cartNumber = cartValue.length;
    this.cartSubject.next(this.cartNumber);
  }
}



   // getProducts() {


  //   return this.productList.asObservable();

  // }

  // setProduct(product: any) {
  //   this.cartItemList.push(...product);
  //   this.productList.next(product);
  // }




  // getTotalPrice(): number {
  //   let grandTotal = 0;
  //   this.cartItemList.map((a: any) => {
  //     grandTotal += a.total;
  //   })
  //   return grandTotal;
  // }



  // removeCartItem(product: any) {

  //   const index: number = this.cartItemList.indexOf(product);
  //   if (index !== -1) {
  //     this.cartItemList.splice(index, 1);
  //   }
  // }




  // / addtoCart(product: any) {

  //   var id = product._id;
  //   let index: number = this.cartItemList.indexOf(product);

  //   for (let i = 0; i < this.cartItemList.length; i++) {
  //     if (id === this.cartItemList[i]._id) {
  //       this.cartItemList[i].quantity += product.quantity;
  //       index = i;
  //       // console.log("Item has already existed");
  //       this.showToasterSuccess();
  //       break;

  //     }
  //   }

  //   if (index == -1) {
  //     this.cartItemList.push(product);
  //     this.showToasterSuccess();

  //   }

  //   // this.cartItemList.push(product);
  //   this.productList.next(this.cartItemList);
  //   // this.showToasterSuccess();
  //   this.getTotalPrice();
  //   console.log(this.cartItemList)
  // }


  // removeAllCart() {
  //   this.cartItemList = []
  //   this.productList.next(this.cartItemList);
  // }
