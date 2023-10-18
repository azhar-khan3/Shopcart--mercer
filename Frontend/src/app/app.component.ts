import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  customerId: any;
  customer!:any;


  constructor(private auth: AuthService, private user:UserService) {}
  async ngOnInit() {
  //   this.customerId= this.auth.getCustomer(this.auth.getUserToken()).sub;
  //   console.log(this.customerId);
  //   const res= await this.user.getOneUser(this.customerId).toPromise();
  //        this.customer = [res];
  //       console.log(this.customer);
  //         return  this.user.data.next(this.customer); 
  
    
  
}



}