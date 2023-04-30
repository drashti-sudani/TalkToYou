import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInSignInComponent } from './log-in-sign-in/log-in-sign-in.component';
import { NewUserComponent } from './log-in-sign-in/new-user/new-user.component';
import { OTPComponent } from './log-in-sign-in/otp/otp.component';
import { ForgetPasswordComponent } from './login/forget-password/forget-password.component';
import { OtpfComponent } from './login/forget-password/otpf/otpf.component';
import{LoginComponent} from './login/login.component'
import { SetnewpasswordComponent } from './login/forget-password/setnewpassword/setnewpassword.component';
import { MainComponent } from './main/main.component';
import { SetBioComponent } from './main/set-bio/set-bio.component';
import { BioComponent } from './main/bio/bio.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AddContactsComponent } from './main/add-contacts/add-contacts.component';
const routes: Routes = [
  {path:"LogIn-SignIn",component:LogInSignInComponent},
  {path:"",component:LogInSignInComponent},
  {path:"LogIn-SignIn/OTP",component:OTPComponent,title:"OTP"},
  {path:"LogIn-SignIn/new-user",component:NewUserComponent},
  {path:"LogIn",component:LoginComponent},
  {path:"LogIn/forgetPassword",component:ForgetPasswordComponent},
  {path:"LogIn/forgetPassword/otp",component:OtpfComponent},
  {path:"LogIn/forgetPassword/set-new-password",component:SetnewpasswordComponent},
  {path:"main",component:MainComponent},
  {path:"main/setBio",component:SetBioComponent},
  {path:"main/Bio/:edit/:bio/:msg",component:BioComponent},
  {path:"editprofile/:bio",component:EditProfileComponent},
  {path:"main/addcontacts",component:AddContactsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent=[LogInSignInComponent,OTPComponent,NewUserComponent,
  LoginComponent,ForgetPasswordComponent,OtpfComponent,SetnewpasswordComponent,
  MainComponent,SetBioComponent,BioComponent,EditProfileComponent,AddContactsComponent]