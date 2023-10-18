import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FilterPipe } from './filter.pipe';
import {  ProductComponent } from './product/product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user/user.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserService } from './services/user.service';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgxUiLoaderModule,  NgxUiLoaderHttpModule } from  'ngx-ui-loader';
import { ProductService } from './services/product.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { MDBBootstrapModule, MdbCardFooterComponent } from 'angular-bootstrap-md';
import { CartComponent } from './cart/cart.component';
import { JwtInterceptor } from './guards/jwt.interceptor';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CheckoutComponent } from './checkout/checkout.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeaderComponent,
    FilterPipe,
    ProductComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NotFoundComponent,
    CartComponent,
    AdminComponent,
    ProfileComponent,
    EditProfileComponent,
    CheckoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    HttpClientModule, 
    ReactiveFormsModule,
    ToastrModule.forRoot({
      closeButton: true
      // positionClass: 'toast-bottom-right',
    // preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    FormsModule,
   
    NgxUiLoaderModule,
    NgxUiLoaderHttpModule.forRoot({
      showForeground: true,

    }),
  MDBBootstrapModule.forRoot(),



 
 

 
  ],
  providers: [ProductService, UserService, AuthService, AuthGuard,  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
