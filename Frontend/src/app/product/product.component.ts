import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';


import { NotificationService } from '../notification.service';
import { ProductService } from '../services/product.service';
import { AuthService } from '../services/auth.service';
import { ProductModel } from './product.model';
import { CartService } from '../services/cart.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
@ViewChild('crudModal')


export class ProductComponent {
  productsList: any = [];
  searchList: any =[];
  formvalue!: FormGroup;
  prodobj: ProductModel = new ProductModel();
  showAdd!: Boolean;
  showUpdate!: Boolean;
  searchKey: string = "";
  fileName = '';
  file!: File;
  imageSrc!: string;
  data: any;
  // button loader varaible
  loader = false;
  loading = false;
  imageLoader = false;



  displaymenu = false;
  displayAdmin = false;
  displayOthers = false;
  currentrole: any;


  constructor(private formBuilder: FormBuilder,  private productService: ProductService, private notifyService: NotificationService, private router: Router, private authService: AuthService) {

    this.myForm();
  }

  ngOnInit() {
    this.getProductAll();

  }

  reloadPage() {
    window.location.reload();
  }
  cancel() {
    this.reloadPage();
  }

  showToasterSuccess() {
    this.notifyService.showSuccess("Data saved successfully !!", "OK")
  }
  showToasterdelete() {
    this.notifyService.showSuccess("Data deleted successfully !!", "OK")
  }

  showToasterError() {
    this.notifyService.showError("Something is wrong", "Bad")
  }

  // showToasterInfo(){
  //     this.notifyService.showInfo("This is info", "tutsmake.com")
  // }

  // showToasterWarning(){
  //     this.notifyService.showWarning("This is warning", "tutsmake.com")
  // }


  myForm() {
    this.formvalue = this.formBuilder.group({
      // title: ['', [Validators.required, Validators.pattern('[a-zA-Z-" "]+$')]],
        title: ['', Validators.required, ],
      description: ['', [Validators.required, Validators.minLength(4)]],
      price: ['', Validators.required],
      category: ['', Validators.required],
      file: ['']

    })
  }

  getProductAll() {
    // this.loading = false;
    this.productService.getProduct()
      .subscribe(res => {
        this.productsList = res;
        // this.loading = false;
        this.productsList.forEach((a: any) => {
          Object.assign(a, { quantity: 1, total: a.price });
        });
      }
      );
    this.productService.search.subscribe((val: any) => {
      this.searchKey = val;
    })

  }

  onChange(event: any) {

    this.imageLoader = true;
    this.file = event.target.files[0];
    const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.formvalue.patchValue({
          fileSource: reader.result
        });
      }; 
  }


 


  get title() { return this.formvalue.get('title'); }
  get description() { return this.formvalue.get('description'); }

  postData() {
    this.loader = true;
    const formData = new FormData();
    if (this.file) {
      this.fileName = this.file.name;
      formData.append('file', this.file);
      formData.append('title', this.formvalue.get('title')?.value);
      formData.append('description', this.formvalue.get('description')?.value);
      formData.append('price', this.formvalue.get('price')?.value);
      formData.append('category', this.formvalue.get('category')?.value);
      formData.append('file', this.formvalue.get('file')?.value);
      console.log(formData);
      this.productService.postProduct(formData).subscribe(res => {

        // this.data = res;
        // console.log("Data");
        this.formvalue.reset();
        this.loader = false;
        this.showToasterSuccess();
        let ref = document.getElementById('cancel')
        ref?.click();
        this.getProductAll();
      
        // this.reloadPage();
        // this.router.navigate(['/admin/product']);

      },
        err => {
          this.showToasterError();
          console.log(err);
        }
      );
    
    }
  }

  deleteProduct(row: any) {
    this.productService.deleteProduct(row._id)
      .subscribe(res => {
        this.showToasterdelete();
        this.getProductAll();
      })
  }


  clickAddProduct() {
    this.formvalue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
   
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.prodobj.id = row._id;
    // this.formvalue.controls['title'].setValue(row.title);
    // this.formvalue.controls['description'].setValue(row.description);
    // this.formvalue.controls['price'].setValue(row.price);
    // this.formvalue.controls['category'].setValue(row.category);
    // this.formvalue.control s['file'].setValue(this.fileName);
    this.formvalue.patchValue(row);

  }


  updateProductDeatils() {
    this.prodobj.title = this.formvalue.value.title;
    this.prodobj.description = this.formvalue.value.description;
    this.prodobj.price = this.formvalue.value.price;
    this.prodobj.file = this.formvalue.value.file;
    this.prodobj.category = this.formvalue.value.category;

    this.productService.updateProduct(this.prodobj.id, this.prodobj)
      .subscribe(res => {
        this.showToasterSuccess();
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formvalue.reset();
        this.getProductAll();
      },
        err => {
          this.showToasterError();
        }
      )
  }



}
