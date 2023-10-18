import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  formvalue!: FormGroup;
  file: File | any = null;
  customerId!: number;
  customer: any = [];
  imageSrc!: string;

  image!: string;
  imageLoader = false;
  loader = false;
  public data = new Subject<any>();
  constructor(private auth: AuthService, private user: UserService, private formBuilder: FormBuilder) { }
  myForm() {
    this.formvalue = this.formBuilder.group({
      file: ['']
    });

  }
  ngOnInit(): void {
    this.getCustomer();
    this.myForm();

  }

   getCustomer() {
   this.customer=  this.user.data.subscribe(res => {
      this.customer = [res];
    })


  }
  onChange(event: any) {

    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    console.log(this.file)
    // reader.onload = () => {
    //   this.imageSrc = reader.result as string;
    //   this.formvalue.patchValue({
    //     fileSource: reader.result
    //   });
    // }; 
  }

  changeImage(event: any) {
    this.loader = true;
    this.imageLoader = true;
    this.file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.file);
    console.log(this.file)
    this.customerId = this.auth.getCustomer(this.auth.getUserToken()).sub;
    const formData = new FormData();
    formData.append("file", this.file, this.file.name);
    formData.append('file', this.formvalue.get('file')?.value);
    this.user.changeImage(this.customerId, formData).subscribe(res => {
      alert("image changed");
      window.location.reload();
      this.getCustomer();
    })
  }



}
