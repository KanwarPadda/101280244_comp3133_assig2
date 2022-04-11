import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddListingComponent } from './add-listing/add-listing.component';
import { AuthenticateAdminGuard } from './authenticate-admin.guard';
import { AuthenticateUserGuard } from './authenticate-user.guard';
import { BookComponent } from './book/book.component';
import { ListingComponent } from './listing/listing.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"list/add", component: AddListingComponent, canActivate:[AuthenticateAdminGuard]},
  {path:"search", component: SearchComponent},
  {path:"listing", component: ListingComponent, canActivate:[AuthenticateUserGuard]},
  {path:"profile", component: ProfileComponent, canActivate:[AuthenticateUserGuard]},
  {path:"register", component: RegisterComponent},
  {path:"book/:id", component: BookComponent, canActivate:[AuthenticateUserGuard]},
  {path: '**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
