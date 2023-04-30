import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
  loading=false;
  type=1
  user=""
  warning=""
  rgu=new RegExp("^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){3,28}(?:[A-Za-z0-9_]))?)$");
  rge = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
  rgn=new RegExp('^[0-9]{10}$');
  change(id:number){
    this.type=id
  }
  finalSubmit(){
    this.loading=true;
    let y=this.http.post<any>("http://localhost:8080/OTP",this.type+this.user);
    if(this.type==2){
      y=this.http.post<any>("http://localhost:8080/OTP",this.type+"+91"+this.user);
    }
    y.subscribe(
      (data:any)=>{
        console.log(data)
        if(data.substring(0,2)==='ok'){
          if(this.type==1){
            localStorage.setItem('userid',this.user)
            if(data.substring(2,data.lastIndexOf(' '))==='email'){
              console.log(data);
              let x=this.http.post<any>("http://localhost:8080/sendMail",{"recipient":data.substring(data.lastIndexOf(' ')+1)});
              x.subscribe(
                (otp:any)=>{
                  //alert(typeof(data))
                  if (otp.toString().charAt(0)=='E') {
                    this.loading=false
                    alert(otp);
                    this.loading=false
                    return;
                  }
                  else{
                    alert("otp sent to "+data.substring(data.lastIndexOf(' ')+1))
                    this.route.navigate(['LogIn/forgetPassword/otp']);
                    localStorage.setItem('ragistrationtype','email');
                    localStorage.setItem('register',data.substring(data.lastIndexOf(' ')+1));
                    localStorage.setItem('otp',JSON.stringify(Number(otp)))
                    localStorage.setItem('userid',this.user);
                  }
                }
              )
            }
            else{
              let x=this.http.post<any>("http://localhost:8080/sendSMS",data.substring(data.lastIndexOf(' ')+1));
              x.subscribe(
                (otp:any)=>{
                  //alert(typeof(data))
                  if (otp.toString().charAt(0)=='E') {
                    this.loading=false
                    alert(otp);
                    this.loading=false
                    return;
                  }
                  else{
                    alert("otp sent to "+data.substring(data.lastIndexOf(' ')+1))
                    this.route.navigate(['LogIn/forgetPassword/otp']);
                    localStorage.setItem('ragistrationtype','mobilenumber');
                    localStorage.setItem('register',data.substring(data.lastIndexOf(' ')+1));
                    localStorage.setItem('otp',JSON.stringify(Number(otp)))
                    localStorage.setItem('userid',this.user);
                  }
                }
              )
            }
          }
          else{
            if(this.type==2){
              let x=this.http.post<any>("http://localhost:8080/sendSMS",this.user);
              x.subscribe(
                (otp:any)=>{
                  //alert(typeof(data))
                  if (otp.toString().charAt(0)=='E') {
                    this.loading=false
                    alert(otp);
                    this.loading=false
                    return;
                  }
                  else{
                    alert("otp sent to "+this.user)
                    this.route.navigate(['LogIn/forgetPassword/otp']);
                    localStorage.setItem('ragistrationtype','mobilenumber');
                    localStorage.setItem('register',this.user);
                    localStorage.setItem('otp',JSON.stringify(Number(otp)))
                    localStorage.setItem('userid',data.substring(2))
                  }
                }
              )
            }
            else{
              let x=this.http.post<any>("http://localhost:8080/sendMail",{"recipient":this.user});
              x.subscribe(
                (otp:any)=>{
                  //alert(typeof(data))
                  if (otp.toString().charAt(0)=='E') {
                    this.loading=false
                    alert(otp);
                    this.loading=false
                    return;
                  }
                  else{
                    alert("otp sent to "+this.user)
                    this.route.navigate(['LogIn/forgetPassword/otp']);
                    localStorage.setItem('ragistrationtype','mobilenumber');
                    localStorage.setItem('register',this.user);
                    localStorage.setItem('otp',JSON.stringify(Number(otp)))
                    localStorage.setItem('userid',data.substring(2))
                  }
                }
              )
            }
          }
          
        
        }
        else{
          alert(data);
          this.loading=false;
        }
      }
    )
  }
  submit():boolean{
    return false
  }
  isDisabled():boolean{
    //take data from server side to confirm user
    //set warning if not applicable
    //console.log(this.password+" "+this.user)
    if(this.user=="" ){
      this.warning="please, Fill all the fields!!"
      return false;
    }
    if(this.user!=""){
      if(this.type==1){
        if(this.rgu.test(this.user)==false){
          this.warning="User id not looking correct!!";
          return false;
        }
      }
      if(this.type==2){
        if(this.rgn.test(this.user)==false){
          this.warning="mobile number not looking correct!!";
          return false;
        }
      }
      if(this.type==3){
        if(this.rge.test(this.user)==false){
          this.warning="email id not looking correct!!";
          return false;
        }
      }
    }
    
    this.warning=""
    return true;
  }
  constructor(private http:HttpClient,private route:Router) { }

  ngOnInit(): void {
  }

}
