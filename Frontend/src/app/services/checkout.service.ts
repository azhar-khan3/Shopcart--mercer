import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class CheckoutService {
    //data from cart compoenent
  public getCartDetails:any;
  apiUrl= environment.apiUrl;
  constructor(private http:HttpClient) { }

  postCheckOut(data:any) {
  
    return this.http.post<any>(`${this.apiUrl}/ckeckout`, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
    

  getCheckOut(){
    return this.http.get<any>(`${this.apiUrl}/ckeckout`)
    .pipe(map((res:any)=>{
        console.log(this.getCartDetails);
      // for(let i =0 ; i<=Array.length; i++){
      //   res[i].price = res[i].price+ 1000; 
      // }
      return res;
    }))
  }


  }