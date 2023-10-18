import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { ConfirmedValidator } from '../register/confirmed.validator';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { UserModel } from './user.model';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  formValue!: FormGroup;
  userObj: UserModel = new UserModel();
  userList!: any;
  showAdd!: Boolean;
  showUpdate!: Boolean;
  file: File | any = null;
  data: any;
  imageLoader = false;


  // button loader varaible
  loader = false;
  imageSrc!: string;
  searchKey: string = "";

  constructor(private formBuilder: FormBuilder, private userService: UserService, private notifyService: NotificationService, private authService: AuthService, private router: Router) {

    this.myForm();
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  reloadPage() {
    window.location.reload();
  }


  showToasterSuccess() {
    this.notifyService.showSuccess("Data saved successfully !!", "OK")
  }

  showToasterUpdate() {
    this.notifyService.showSuccess("Data updated successfully !!", "OK");
  }

  showToasterdelete() {
    this.notifyService.showSuccess("Data deleted successfully !!", "OK")
  }
  showToasterError() {
    this.notifyService.showError("Something is wrong", "Bad")
  }

  myForm() {

    this.formValue = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobile: ['', Validators.required],
      role: [''],
      password: ["", [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
      confirm_password: ['', [Validators.required]],
      file: ['']
    },
      {
        validator: ConfirmedValidator('password', 'confirm_password')
      }
    )
  }

  getAllUsers() {
    this.userService.getUser()
      .subscribe(res => {
        this.userList = res;
      });
    this.userService.search.subscribe((val: any) => {
      this.searchKey = val;
    })
  }


  onChange(event: any) {
    this.imageLoader = true;
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    console.log(this.file)
    reader.onload = () => {
      this.imageSrc = reader.result as string;
      this.formValue.patchValue({
        fileSource: reader.result
      });
    };
  }

  cancel() {
    this.reloadPage();
  }

  postData() {

    this.loader = true;
    const formData = new FormData();
    formData.append("file", this.file, this.file.name);
    formData.append('username', this.formValue.get('username')?.value);
    formData.append('firstName', this.formValue.get('firstName')?.value);
    formData.append('lastName', this.formValue.get('lastName')?.value);
    formData.append('password', this.formValue.get('password')?.value);
    formData.append('mobile', this.formValue.get('mobile')?.value);
    formData.append('role', this.formValue.get('role')?.value);
    formData.append('file', this.formValue.get('file')?.value);
    this.userService.postUser(formData).subscribe(res => {
      
      // this.data = res;
      this.formValue.reset();
      this.loader = false;
      this.showToasterSuccess();
      let ref = document.getElementById('cancel')
      ref?.click();
      this.getAllUsers();
    },
      err => {
        this.showToasterError();
      } );
    }


  deleteUser(row: any) {
    this.userService.deleteUser(row._id)
      .subscribe(res => {

        this.showToasterdelete();
        this.getAllUsers();
      })
  }


  clickAddUser() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.userObj.id = row._id;
    this.formValue.controls['username'].setValue(row.username);
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['password'].setValue(row.password);
    // this.formValue.controls['status'].setValue(row.status); 
    this.formValue.controls['role'].setValue(row.role);
    this.formValue.controls['file'].setValue(row.file);
    // this.formValue.patchValue(row);
  }


  updateUsertDeatils() {
    this.userObj.username = this.formValue.value.username;
    this.userObj.firstName = this.formValue.value.firstName;
    this.userObj.lastName = this.formValue.value.lastName;
    this.userObj.mobile = this.formValue.value.mobile;
    this.userObj.password = this.formValue.value.password;
    this.userObj.role = this.formValue.value.role;
    this.userObj.file = this.formValue.value.file;

    this.userService.updateUser(this.userObj.id, this.userObj)
      .subscribe(res => {
        let ref = document.getElementById('cancel')
        ref?.click();
        this.showToasterUpdate();
        this.getAllUsers();
      },
        err => {
          this.showToasterError();
        }
      )
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);

  }
}
