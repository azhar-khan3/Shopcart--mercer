import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  public search = new BehaviorSubject<string>("");
  apiUrl = environment.apiUrl;
  customer: any = [];
  public data = new BehaviorSubject<[]>(this.customer);
  // private httpOptions = {
  //   headers: new HttpHeaders()
  //     // .append("X-ClientInfo", JSON.stringify(this.xClientInfoHeader))
  //     .append("Authorization", "Bearer " + this.getAccessToken())
  // };
  constructor(private http: HttpClient, private authService: AuthService) { }


  getUser() {
    return this.http.get<any>(`${this.apiUrl}/users`);
    // .pipe(map((res:any)=>{

    //   return res;
    // }))
  }

  getData(): Observable<any> {
    return this.data.asObservable();
  }




  postUser(data: any) {

    return this.http.post<any>(`${this.apiUrl}/user/register`, data);

  }



  deleteUser(_id: number) {

    return this.http.delete(`${this.apiUrl}/user/${_id}`);

  }

  getOneUser(id: number) {
    return this.http.get(`${this.apiUrl}/user/${id}`);
    // .pipe(map((res:any)=>{
    //   return [res];
    //   }))
  }

  //update api for updating selected record
  updateUser(_id: number, data: any) {
    return this.http.put<any>(`${this.apiUrl}/user/${_id}`, data);

  }
  changeImage(_id: any, data: any) {
    return this.http.patch(`${this.apiUrl}/image/${_id}`, data)
  }


  getAccessToken() {
    return sessionStorage.getItem(this.authService.TOKEN_KEY);
  }

}
