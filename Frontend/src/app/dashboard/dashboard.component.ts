import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthGuard } from '../guards/auth.guard';
import * as $ from "jquery";
import { AuthService } from '../services/auth.service';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { NotificationService } from '../notification.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserService } from '../services/user.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { once } from 'events';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  productList = [];
  filterCategory :any= [];
  // filterCategory:any = [];
  searchList: any = [];
  searchKey: string = "";
  selectedItem = null;
  selectedIndexs: any;
  data = [];
  loader = false;
  value = true;
  category!: any;
  productData: any = [];
  productId!: string;
  hide = false;
  productFilterApi = environment.productFilterApi;
  filterData = new BehaviorSubject<any>(this.category);

  reloadPage() {
    window.location.reload();
  }
  constructor(private productService: ProductService, private user: UserService, private cartService: CartService, private router: Router, private location: Location, private authService: AuthService, private notifyService: NotificationService,
    private http: HttpClient, private route: Router) { }

  showToasterSuccess() {
    this.notifyService.showSuccess("Item Added to Cart !!", "OK")
  }
  sidenavbardropdown() {
    this.hide = !this.hide
  }

  ngOnInit() {
    this.getProducts();
    this.cartService.cartSubject.subscribe(res=>{})
    // this.searchProduct();
  }

  getProducts() {
    this.loader = true;
    this.productService.getProduct()
      .subscribe((res: any) => {
        this.productList = res;
        this.filterCategory = res;
        this.productList.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price });
        });
      },
        // error=>{
        //   if(error.status === 401) {
        //     this.authService.logoutAndRedirect();
        //   }
        // }
      );
    // this.cartService.search.subscribe((val: any) => {
    //   this.searchKey = val;
    // })
    this.productService.search.subscribe((val: any) => {
      this.searchKey = val;
    })

  }

  addtocart(item: any) {
    this.cartService.addCart(item);
    this.showToasterSuccess();
  }

  onProduct(item: any) {
    sessionStorage.removeItem("productId")
    this.route.navigate(['product-details']);
    this.productId = item._id;
    sessionStorage.setItem("productId", this.productId)
    this.productService.id.next(this.productId);
  }

  searchProduct() {
    var searchTerm = "Ring";
    searchTerm = searchTerm.trim().toLowerCase();
    const params = new HttpParams()
      .set('search', searchTerm )
    this.http.get(`${this.productFilterApi}`, { params }).subscribe(res => {
      this.searchList = res;
      console.log(this.searchList);
    })
    //  var searchTerm = this.productService.searchData;
    // this.http.get("http://localhost:3000/product/filter?search="+searchTerm).subscribe(res=>{
    //   this.searchList =res;
    //   // console.log(this.searchList);
    // })
  }

  refresh(): void {
    window.location.reload();
  }

  filter(category: string) {
    var addclass = 'active';
    var $div = $(".myDiv li").click(
      function () {
        // $(this).css("background-color", "#FFFF00");
        $div.removeClass(addclass);
        $(this).addClass(addclass);
      }
    );
    //add http param
    const params = new HttpParams()
      .set('category', category)
    this.filterData.next(category);
    this.value = true;
    this.http.get<any>(this.productFilterApi, { params }).subscribe(res => {
      this.filterCategory = res;
      this.value = false;
    });
    // this.filterCategory = this.productList.filter((a:any)=>{
    //   if(a.category == category || category==''){
    //     return a;

    //   }
    // }
    // );
  }

  filterRange(minimumPrice: number, maximumPrice: number) {
    // for(value1=775; value1<15000; value1++){
    var addclass = 'active';
    var $div = $("form .range label").click(
      function () {
        $div.removeClass(addclass);
        $(this).addClass(addclass);
      }
    );

    this.filterData.subscribe(res => {
      this.category = res;
    })
    const params = new HttpParams()
      .set('category', this.category)
      .set('min', minimumPrice)
      .set('max', maximumPrice)

    //without param
    // this.http.get<any>(this.productFilterApi + "/filter?category=" + this.category + "&" + "min=" + minimumPrice + "&" + "max=" + maximumPrice)
    this.http.get<any>(this.productFilterApi, { params })
      .subscribe(res => {
        // this.filterCategory = data;
        this.filterCategory = res;
        // = res.filter((product: any) => {
        //   return product.price >= minimumPrice
        //     && product.price <= maximumPrice
        // });
        // this.location.go('/home/');
      });
  }

  sort(event: any) {
    switch (event.target.value) {
      case "Low":
        {
          const sortType = "asc";
          const params = new HttpParams()
            .set('sort', sortType)

          this.http.get<any>(this.productFilterApi, { params }).subscribe(res => {
            this.filterCategory = res;
          })
          break;
        }
      case "High":
        {
          const sortType = "desc";
          const params = new HttpParams()
            .set('sort', sortType)
          this.http.get<any>(this.productFilterApi, { params }).subscribe(res => {
            this.filterCategory = res;
          })
          break;
        }
    }
    return this.filterCategory;
  }
}

  // sort(event: any) {

  //   this.productService.getProduct()
  //     .subscribe((res: any) => {
  //         this.filterCategory = res;
  //         switch (event.target.value) {
  //           case "Low":
  //             {
  //               this.filterCategory = this.filterCategory.sort((low: { price: number; }, high: { price: number; }) => low.price - high.price);
  //               break;
  //             }

  //           case "High":
  //             {
  //               this.filterCategory = this.filterCategory.sort((low: { price: number; }, high: { price: number; }) => high.price - low.price);
  //               break;
  //             }



  //           default: {
  //             this.filterCategory = this.filterCategory.sort((low: { price: number; }, high: { price: number; }) => low.price - high.price);
  //             break;
  //           }

  //         }
  //     });

  //   return this.filterCategory;

  // }

  //   sortProductByPrice(option:any){

  //     this.productService.getProduct()
  //     .subscribe((res: any) => {
  //       this.filterCategory = res;
  //       if(option.value =='l2h'){
  //         this.filterCategory.sort((a: { price: any; }, b: { price: any; }) => Number(a.price) - Number(b.price));
  //       }else if(option.value =='h2l'){
  //         this.filterCategory.sort((a: { price: any; }, b: { price: any; }) => Number(b.price) - Number(a.price));
  //       }

  //     });


  //  }

