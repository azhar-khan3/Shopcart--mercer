import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
 
})


export class ProductService {

  public search = new BehaviorSubject<string>("");
  public searchData:any;
  apiUrl= environment.apiUrl;
  productUrl= environment.productApi;
  productId!:string
  
  public id = new BehaviorSubject<string>(this.productId);

  
  // private httpOptions = {
  //   headers: new HttpHeaders()
  //     // .append("X-ClientInfo", JSON.stringify(this.xClientInfoHeader))
  //     .append("Authorization", "Bearer " + this.getAccessToken())
  // };

   /// ,  "http://localhost:3000/product", this.httpOptions
  constructor(private http:HttpClient,  private authService: AuthService) { }

  getProduct(){
    return this.http.get<any>(`${this.productUrl}`)
    .pipe(map((res:any)=>{
      // for(let i =0 ; i<=Array.length; i++){
      //   res[i].price = res[i].price+ 1000; 
      // }
      return res;
    }))
  }

  getOneProduct(id:string){
    return this.http.get<any>(`${this.productUrl}/product/${id}`)
  }

  // 
  postProduct(data:any) {
    return this.http.post<any>(`${this.productUrl}`, data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
//   postData(data:any, file:File) : Observable<HttpEvent<any>> {  
   

//     const formData: FormData = new FormData();
//     formData.append('file', file);
//     const req = new HttpRequest('POST', `'http://localhost:3000/product/image'`, formData, {
//     reportProgress: true,
//     responseType: 'json'
//   });
//   return this.http.request(req);
// }

deleteProduct(_id:number)
{
  
  return this.http.delete(`${this.productUrl}/${_id}`)
  .pipe(map((res:any)=>{
    return res;
    }))
}

//update api for updating selected record
updateProduct(_id:number,data:any): Observable<HttpEvent<unknown>>
{
  return this.http.patch<any>(`${this.productUrl}/${_id}`,data)
  .pipe(map((res:any)=>{
    return res;
    }))
} 


getAccessToken() {
  return sessionStorage.getItem(this.authService.TOKEN_KEY);
}



}
