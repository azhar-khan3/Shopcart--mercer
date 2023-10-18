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

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  submitted = false;
  error = false;
  responsedata: any;
  currentrole: any;

  form = this.fb.group({
    username: ["", Validators.required],
    password: ["", Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router, private notifyService: NotificationService
  ) {

  }



  ngOnInit(): void { }

  showToasterError() {
    this.notifyService.showError("Invalid User", "Bad")
  }

  get usernameControl() {
    return this.form.get("username") as FormControl;
  }

  get passwordControl() {
    return this.form.get("password") as FormControl;
  }
  reloadPage() {
    window.location.reload();
  }

  login(form: FormGroup) {
    this.submitted = true;
    const { value, valid } = form;
    if (valid) {
      this.authService.login(value.username, value.password).subscribe(
        data => {
          this.responsedata = data;

          this.currentrole = this.authService.getRoleByToken(this.authService.getUserToken());
          if (this.currentrole == 'Admin') {
            this.router.navigate(['admin']);
          }
          else {
            this.router.navigate(['']);
          }
          // this.authService.updatemenu.next();

          // .then(() => {
          //   window.location.reload();
          // });
        },
        error => {
          this.error = true;
          this.showToasterError();
        }
      );
    }
  }
}
