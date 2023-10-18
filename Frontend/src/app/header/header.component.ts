import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AuthService } from '../services/auth.service';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public productList = <any>{};
  public filterCategory = <any>{};
  public searchTerm !: string;
  displaymenu = false;
  searchData = [];
  data :any= [];
  displayAdmin = false;
  displayOthers = false;
  image!:string;
  public totalItem : number = 0;
  showSearch = false;
  customerId!:number;

  constructor(private authService:AuthService, private cartService: CartService, 
    private router: Router, private productService: ProductService,
    private userService:UserService, private http:HttpClient) { }

  ngOnInit(): void {
    
    this.totalItemFun();
    this.cartService.cartSubject.subscribe(data=>{
         this.totalItem =  data;
    })

    this.getCustomerImage();
    // this.cartService.getProducts()
    // .subscribe(res=>{
      // this.totalItem = res.length;
    // })

    // this.authservice.updatemenu.subscribe(res => {
    //   this.MenuDisplay();
    //   this.LoadMenu();
    // });
    //  this.MenuDisplay();
    //  this.LoadMenu();
  }


  totalItemFun(){
    if(localStorage.getItem('localCart') != null){
      var cartCount = JSON.parse(localStorage.getItem('localCart')!)
      for (let i = 0; i < cartCount.length; i++) {
        this.totalItem += cartCount[i].quantity;
      }
    }
  }

  getCustomerImage(){
    this.customerId = this.authService.getCustomer(this.authService.getUserToken())._id;
    this.userService.getOneUser(this.customerId).subscribe(res=>{
    this.data = res;
    this.image =this.data.imageUrl;
    this.userService.data.next(this.data)
    });
  }
 
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.productService.search.next(this.searchTerm);   
  }


  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }   
}

  // MenuDisplay(){

  //   this.currentrole = this.authService.getRoleByToken(this.authService.getUserToken());
  //   this.displayAdmin = this.currentrole == 'Admin';
  //   this.displayOthers =( this.currentrole == 'Admin' || this.currentrole == 'Customer') ;
  
  // }

  // LoadMenu() {
  //   if (this.authService.getUserToken() != '') {
  //     this.currentrole = this.authService.getRoleByToken(this.authService.getUserToken());
  //     this.authService.GetMenubyrole(this.currentrole).subscribe(result => {
  //       this.menulist$ = result;
  //     });
  //   }
  // }



  // search1(event:any){
  //   this.searchTerm = (event.target as HTMLInputElement).value;
  //   console.log(this.searchTerm);
  //   this.userService.search.next(this.searchTerm);
  // }
