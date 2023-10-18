import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import  jwt_token  from 'jwt-decode';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  apiUrl = environment.apiUrl;
  TOKEN_KEY = "Admin";
  tokenresp: any;

  private _updatemenu = new Subject<void>();
  get updatemenu() {
    return this._updatemenu;
  }

 

  private userToken:any;

  // xClientInfoHeader = {
  //   appVersion: "1.0.0",
  //   os: "macOS",
  //   osVersion: "10.14.5",
  //   device: "mac Mini",
  //   lang: "sv"
  // };

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     "X-ClientInfo": JSON.stringify(this.xClientInfoHeader)
  //   })
  // };

  constructor(private httpClient: HttpClient, private http: HttpClient, private router: Router) {}

  // login(username: string, password: string) {
  //   const endpoint = this.apiUrl + "/user/login";
  //   const httpParams = {
  //     username: username,
  //     password: password
  //   };

  //   return this.httpClient
  //     .post<{ access_token: string }>(endpoint, httpParams)
  //     .pipe(
  //       map(token => {
  //         this.userToken = token.access_token;
  //         this.storeToken();
  //       })
  //     );
  // }

  
  login(username: string, password: string) {  
  
    const endpoint =`${this.apiUrl}/user/login`;
    return this.http.post<any>(endpoint, {username,password}).pipe(
      map((token) => {
        // console.log('token' + token.access_token);
        this.userToken = token.access_token;
         this.storeToken();
      })
    )
  }


  // register(username: string, password: string, name:string, mobile:string, role:string) {
  //   const endpoint = this.apiUrl + "/register";
  //   const httpParams = {
  //     username: username,
  //     password: password,
  //     name: name,
  //     mobile: mobile,
           
  //     role: role

  //   };

  //   return this.httpClient
  //     .post(endpoint, httpParams)
  // }



  logoutAndRedirect() {
    this.logout();
    const url = "/login";
    this.router.navigate([url]);
  }

  logout() {
    this.userToken = undefined;
    this.clearToken();
    
  }

  getUserToken() {
      return this.userToken || '';
        
  }

  isLoggedIn() {
    return typeof this.userToken != null;
  }

  storeToken() {
    // localStorage.setItem('token', tokendata.jwtToken);
    sessionStorage.setItem(this.TOKEN_KEY, this.getUserToken());
  }



  // IsLogged() {
  //   return localStorage.getItem("token") != null;
  // }


  clearToken() {
    sessionStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem('Admin1');
  }

  hasStoredToken() {
    return (
      sessionStorage.getItem(this.TOKEN_KEY) &&
      sessionStorage.getItem(this.TOKEN_KEY)!.length > 0
    );
  }

  getRoleByToken(token:any){

    token = sessionStorage.getItem(this.TOKEN_KEY);
    console.log(token);
    // let _token = token.split('.')[1];
      // this.tokenresp = JSON.parse(atob(token.split('.')[1]));
    this.tokenresp=  jwt_token(token);
    return this.tokenresp.user.role;

  }

  getCustomer(token:any){
    token = sessionStorage.getItem(this.TOKEN_KEY);
    // let _token = token.split('.')[1];
    // this.tokenresp =JSON.parse(atob(_token));
    this.tokenresp=  jwt_token(token);
    console.log(this.tokenresp.user);
    return this.tokenresp.user;

  }

  GetMenubyrole(role: any) {
    return this.http.get(this.apiUrl + 'GetMenubyRole/' + role)
  }

  
}