import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AdminGuard } from './guards/adminRoles.Guard';

import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';


import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [


  { path: "home", component: HomeComponent , canActivate: [AuthGuard, AdminGuard] },
  {path:'admin/product', component: ProductComponent , canActivate: [AuthGuard,RoleGuard] },
  {path:'admin/user', component: UserComponent , canActivate: [AuthGuard,RoleGuard]},
  {path: 'cart',  component: CartComponent,   canActivate: [AuthGuard, AdminGuard]},
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home/Electronics",   component: HomeComponent, canActivate: [AuthGuard, AdminGuard] },
  { path: "admin",   component: AdminComponent, canActivate: [AuthGuard, RoleGuard] },
  { path: "home/Fashion",    component: HomeComponent,canActivate: [AuthGuard, AdminGuard] },
  { path: "home/Jewelery",  component: HomeComponent,  canActivate: [AuthGuard, AdminGuard] },
  { path: "login", component: LoginComponent },
  { path: "profile", component: ProfileComponent,  canActivate: [AuthGuard, AdminGuard]},
  { path: "edit-profile", component: EditProfileComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: "checkout", component: CheckoutComponent, canActivate: [AuthGuard, AdminGuard]},
  { path: "register", component: RegisterComponent },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "404" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
