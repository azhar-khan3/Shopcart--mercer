import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../notification.service';
import { CartService } from '../services/cart.service';
import { CheckoutService } from '../services/checkout.service';
import { CheckoutModel } from './checkout.model';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  alltotal:number=  0;
  data = [];
  getCartDetails:any= [];
  cartNumber:number=0;
  formvalue!: FormGroup;
  checkObj:CheckoutModel = new CheckoutModel();

  constructor(private cartService: CartService, private formBuilder: FormBuilder, private checkService:CheckoutService,
    private notifyService:NotificationService) { }

  ngOnInit(): void {
    this.grandtotal();
    this.cartNumberFun();
    this.myForm();
    this.getCheckOut();
  }


  showToasterSuccess() {
    this.notifyService.showSuccess("Your order has placed !!", "OK")
  }
  myForm() {
    this.formvalue = this.formBuilder.group({
  
      firstName: [''],
      lastName: [''],
      email: [''],
      country: [''],
      address: [''],
      state: [''],
      zip: [''],
      products: []


    })
  }

  inc(id:any, quantity:any){
    // console.log(prod);
    for(let i=0; i<this.getCartDetails.length; i++){
      if(this.getCartDetails[i]._id === id){
        if(quantity != 7)
        this.getCartDetails[i].quantity = parseInt(quantity)+1;
      }
    }
  
  localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
  this.grandtotal();
  }
  grandtotal(){
    console.log(this.checkService.getCartDetails) ;
    if(localStorage.getItem('localCart')){
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!);
    this.alltotal = this.getCartDetails.reduce(function(acc:any, val:any){
     return acc+ (val.price * val.quantity)
    }, 0)
  }
  }

  dec(id:any, quantity:any){
    // console.log(prod);
    for(let i=0; i<this.getCartDetails.length; i++){
      if(this.getCartDetails[i]._id === id){
        if(quantity != 1)
        this.getCartDetails[i].quantity = parseInt(quantity) - 1;
      }
    }
   
  localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
  this.grandtotal();
  }
  cartNumberFun(){
    var cartValue = JSON.parse(localStorage.getItem('localCart')!) ;
    this.cartNumber = cartValue.length;
    console.log(this.cartNumber)
    this.cartService.cartSubject.next(this.cartNumber);
    
  }



  getCheckOut(){
    this.checkService.getCheckOut().subscribe(res=>{
    [this.data]= res;
    console.log(this.data)
    //  console.log(this.data.products)
    
    })
  }
  postCheckOut(){
   
 
    // const formData = new FormData();
    //   formData.append('firstName', this.formvalue.get('firstName')?.value);
    //   formData.append('lastName', this.formvalue.get('lastName')?.value);
    //   formData.append('email', this.formvalue.get('email')?.value);
    //   formData.append('country', this.formvalue.get('country')?.value);
    //   formData.append('city', this.formvalue.get('city')?.value);
    //   formData.append('state', this.formvalue.get('state')?.value);
    //   formData.append('zip', this.formvalue.get('zip')?.value);


      this.checkObj.firstName = this.formvalue.value.firstName;
      this.checkObj.lastName = this.formvalue.value.lastName
      this.checkObj.email = this.formvalue.value.email;
      this.checkObj.address = this.formvalue.value.address;
      this.checkObj.city = this.formvalue.value.city;
      this.checkObj.state = this.formvalue.value.state;
      this.checkObj.zip = this.formvalue.value.zip;
      this.checkObj.products = this.checkService.getCartDetails;
      console.log()
      this.checkService.postCheckOut(this.checkObj).subscribe(res=>{

     this.showToasterSuccess();
     this.formvalue.reset();
      },
      err => {
     
        console.log(err);
      }
      
      )
  }



}
