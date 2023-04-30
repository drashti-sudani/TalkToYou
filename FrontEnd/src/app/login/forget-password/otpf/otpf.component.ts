import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otpf',
  templateUrl: './otpf.component.html',
  styleUrls: ['./otpf.component.css']
})
export class OtpfComponent implements OnInit {
  model=new otp();
  //6 digit otp
  regexn=new RegExp('^[0-9]{6}$');
  isDisabled() : boolean{
    //console.log(this.regexn.test(this.model.otp))
    return this.regexn.test(this.model.otp);
  }
  validation():string{
    const btn = document.getElementById('btn') as HTMLButtonElement | null;
    const l1=document.getElementById('id') as HTMLAnchorElement | null;
    btn?.setAttribute('disabled', '');
    l1?.setAttribute('disabled','');
    if(this.regexn.test(this.model.otp)==false){
      return "Enter valid OTP"
    }
    btn?.removeAttribute('disabled');
    l1?.removeAttribute('disabled');
    return "";
    
  }
  submit(){
    if(Number(this.model.otp)==Number(localStorage.getItem('otp'))){
      this.route.navigate(['LogIn/forgetPassword/set-new-password']);
    }
    else{
      alert("Incorrect OTP");
    }
  }
  constructor(private http:HttpClient,private route:Router) { }

  ngOnInit(): void {
  }

}
export class otp{
  otp="";
}
