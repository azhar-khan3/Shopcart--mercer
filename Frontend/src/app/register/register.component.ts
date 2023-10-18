import { Component, OnInit } from "@angular/core";
import {
  Validators,
  FormBuilder,
  FormControl,
  FormGroup
} from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "../notification.service";
import { ConfirmedValidator } from "./confirmed.validator";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  submitted = false;
  error = false;

  file: File | any = null;
  data : any;
  imageSrc!: string;
  loader = false;
  form = this.fb.group({
    firstName: ["", Validators.required],
    lastName: ["", Validators.required],
    username: ["", Validators.required],
    mobile: ["", Validators.required],
    file:[''],
    role:[],
    password: ["", [Validators.required, Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]],
    confirm_password: ['', [Validators.required]]
  }, 
  { 
    validator: ConfirmedValidator('password', 'confirm_password')
  }
  
  );


  
   
  
 
  showToasterSuccess(){
    this.notifyService.showSuccess("User Registered Successfully !!", "OK")
}
 
showToasterError(){
    this.notifyService.showError("Something is wrong", "Bad")
}


  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,  private notifyService : NotificationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}


  // get nameControl() {
  //   return this.form.get("name") as FormControl;
  // }

  // get mobileControl() {
  //   return this.form.get("mobile") as FormControl;
  // }

  // get usernameControl() {
  //   return this.form.get("username") as FormControl;
  // }

  // get passwordControl() {
  //   return this.form.get("password") as FormControl;
  // }

  // get role() {
  //   return this.form.get("role") as FormControl;
  // }

 

  // register(form: FormGroup) {
  //   this.submitted = true;
  //   const { value, valid } = form;
  //   if (valid) {
  //     this.authService.register(value.username, value.password, value.name, value.mobile, value.role).subscribe(
  //       data => {
  //         this.form.reset()
  //         this.submitted = false;
  //       },
  //       error => {
  //         this.error = true;
  //       }
  //     );
  //     this.showToasterSuccess();
  //     const url = "/login";
  //     this.router.navigate([url]);
 
  //   }
  // }



  onChange(event:any) {
  
    this.file = event.target.files[0];
    const reader = new FileReader();
      reader.readAsDataURL(this.file);
      console.log(this.file)
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.form.patchValue({
          fileSource: reader.result
        });
      }; 
}
 
  register(){
     
    this.loader = true;
    const formData = new FormData();
    formData.append("file", this.file, this.file.name);
    formData.append('username', this.form.get('username')?.value);
    formData.append('firstName', this.form.get('firstName')?.value);
    formData.append('lastName', this.form.get('lastName')?.value);
    formData.append('password', this.form.get('password')?.value);
    formData.append('mobile', this.form.get('mobile')?.value);
    
    formData.append('role', this.form.get('role')?.value);
    formData.append('file', this.form.get('file')?.value);
   
    this.userService.postUser(formData).subscribe(
      (res:any) =>{   
      this.data = res;
      this.loader = false;
      this.form.reset();
                                     
      this.showToasterSuccess();
      const url = "/login";
      this.router.navigate([url]);
    },
    err=>{
      this.showToasterError();

    }
    );
   
}
}
