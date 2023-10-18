import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from '../notification.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { UserModel } from '../user/user.model';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  formvalue!: FormGroup;
  userdobj: UserModel = new UserModel();
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private userService: UserService, private notify: NotificationService) { }

  customer: any = [];
  customerId: any;
  ngOnInit(): void {
    // this.getCustomer();
    this.myForm();
    this.onEdit();
  }

  showToasterSuccess() {
    this.notify.showSuccess("User Updated Successfully !!", "OK")
  }

  myForm() {

    this.formvalue = this.formBuilder.group({
      username: ['',],
      firstName: [''],
      lastName: [''],
      mobile: [''],
      role: [''],
      password: [""],
      file: ['']
    },
    )
  }


  onEdit() {
    this.customerId = this.auth.getCustomer(this.auth.getUserToken()).sub;
    console.log(this.customerId);
    this.userService.getOneUser(this.customerId).subscribe(res => {
      this.customer = res;
      console.log(this.customer);
      for (let item of this.customer) {
        if (true) {
          this.userdobj.id = item._id;
          console.log(item);
          this.formvalue.patchValue(item);
          return item;
        }
      }
    });
  }

  updateUsertDeatils() {
    this.userdobj.username = this.formvalue.value.username;
    this.userdobj.firstName = this.formvalue.value.firstName;
    this.userdobj.lastName = this.formvalue.value.lastName;
    this.userdobj.mobile = this.formvalue.value.mobile;
    this.userdobj.password = this.formvalue.value.password;
    this.userdobj.role = this.formvalue.value.role;
    this.userdobj.file = this.formvalue.value.file;

    this.userService.updateUser(this.userdobj.id, this.userdobj)
      .subscribe(res => {
        this.showToasterSuccess();
      },
        err => {
          // this.showToasterError();
        }
      )
  }
}
