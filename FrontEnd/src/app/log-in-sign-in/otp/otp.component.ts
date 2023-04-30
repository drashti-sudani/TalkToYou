import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OTPComponent implements OnInit {
  [x: string]: any;
  model=new otp();
  //6 digit otp
  regexn=new RegExp('^[0-9]{6}$');
  otp=""
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
      //console.log("False")
      return "Enter valid OTP"
    }
    btn?.removeAttribute('disabled');
    l1?.removeAttribute('disabled');
    return "";
    
  }
  submit(){
    //console.log(Number(this.model.otp))
    //console.log(Number(this.otp))
    //console.log(Number(this.model.otp.toString())+" "+localStorage.getItem('otp')?.toString().substring(1,7))
    if(Number(this.model.otp.toString())==Number(localStorage.getItem('otp'))){
      //console.log("In submit")
      localStorage.setItem("varified",JSON.stringify(true))
      this.route.navigate(['./LogIn-SignIn/new-user']);
    }
    else{
    alert("OTP is not valid")
    }
  }
  constructor(private route:Router) {
    //console.log(typeof(localStorage.getItem('otp')));
    //console.log(localStorage.getItem('otp')==null)
    if(localStorage.getItem('otp')==null||localStorage.getItem('otp')==='null'){
      this.route.navigate(['LogIn-SignIn/']);
    }
    this.otp=JSON.stringify( localStorage.getItem('otp'))
  }

  ngOnInit(): void {
  }

}
export class otp{
  otp="";
}
