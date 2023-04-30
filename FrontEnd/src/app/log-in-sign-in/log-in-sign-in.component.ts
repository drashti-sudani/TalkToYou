import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core'; 
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { EncrDecrService } from '../encr-decr.service';

@Component({
  selector: 'app-log-in-sign-in',
  templateUrl: './log-in-sign-in.component.html',
  styleUrls: ['./log-in-sign-in.component.css']
})
@Injectable({providedIn:'root'})
export class LogInSignInComponent implements OnInit {
  model =new LogInForm1();
  regexe = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
  regexn=new RegExp('^[0-9]{10}$');
  submitted=false
  link="";
  loading=false
 
  submit(){
    
    this.loading=true
    let check=true;
    if(this.model.email.length!=0){
      let x=this.http.post<any>("http://localhost:8080/check","email"+" "+this.model.email);
      x.subscribe(
        data=>{
          if(data==false){
            check=false;
            alert("Mail address is already register please login!")
            this.loading=false;
            return;
          }
          else{
            this.api.get(this.model.email).subscribe(
            otp=>{
              //alert(typeof(data))
              if (isNaN(otp)) {
                this.loading=false
                alert(otp);
                this.loading=false
                return;
              }
              else{
                if(check){
              this.route.navigate(['LogIn-SignIn/OTP/']);
              localStorage.setItem('ragistrationtype','email');
              localStorage.setItem('register',this.model.email);
              localStorage.setItem('otp',JSON.stringify(Number(otp)))
              }
              this.link='';
              this.loading=false
              }
            }
            
          );
        }
        }
      )
      
    }
    else{
      let check=true;
      this.loading=true
      let x=this.http.post<any>("http://localhost:8080/check","mobilenumber"+" "+"+91"+this.model.number);
      x.subscribe(
        data=>{
          if(data==false){
            check=false;
            alert("Mobile Number is already register please login!")
            this.loading=false;
            return;
          }
          else{
            let y=this.http.post<any>("http://localhost:8080/sendSMS","+91"+this.model.number);
            y.subscribe(
              (otp:any)=>{
                //alert(typeof(data))
                if (otp.toString().charAt(0)=='E') {
                  this.loading=false
                  alert(otp);
                  this.loading=false
                  return;
                }
                else{
                  if(check){
                this.route.navigate(['LogIn-SignIn/OTP/']);
                
                localStorage.setItem('ragistrationtype','mobilenumber');
                localStorage.setItem('register',this.model.email);
                localStorage.setItem('otp',JSON.stringify(Number(otp)))
                }
                this.link='';
                this.loading=false
                }
              }
            )
          }
        }
      )
      
      //alert(x.subscribe);
      //this.loading=false;
    }
    
  }
  isDisabled() : boolean{
    if((this.model.email=="" && this.model.number=="" ) || (this.model.email!="" && this.model.number!="")){
      return false;
    }
    else if(this.model.email!="" && this.regexe.test(this.model.email)==false){
      return  false;
    }
    else if(this.model.number!="" && this.regexn.test(this.model.number)==false){
      return false;
    }
    return true;
  }
   validation() : string{
    const btn = document.getElementById('btn') as HTMLButtonElement | null;
    const l1=document.getElementById('id') as HTMLAnchorElement | null;
    btn?.setAttribute('disabled', '');
    l1?.setAttribute('disabled','');
    //console.log("disabled")
    if((this.model.email=="" && this.model.number=="" ) || (this.model.email!="" && this.model.number!="")){
      return "Enter only one of the given field";
    }
    else if(this.model.email!="" && this.regexe.test(this.model.email)==false){
      return "enter valid mail address"
    }
    else if(this.model.number!="" && this.regexn.test(this.model.number)==false){
      return "enter valid mobile number";
    }
    btn?.removeAttribute('disabled');
    l1?.removeAttribute('disabled');
    //console.log("enabled")
    return "";

  }
  constructor(private http:HttpClient,private api:ApiService,private route:Router,private EncrDecr: EncrDecrService) { 
    
    //this.loadPosts();
  }
  loadPosts(){
  //   this.http.post("http://localhost:8080/sendEmail",{
  //     "to":"drashtisudani1403@gmail.com",
  //     "suject":"API Mail",
  //     "message":"Heyy...This is sping boot mailing"
  // },{headers: this.headers }).subscribe((response)=>{
  //     alert(JSON.stringify(response))
  //     console.log(response);
  //   })
  //   this.http.get("https://api.github.com/users/LearnCodeWithDurgesh",{}).subscribe((response)=>{
  //     alert(JSON.stringify(response))
  //   })
    
  }
  ngOnInit(): void {
     
  }

}
export class LogInForm1{
  email="";
  number="";
}
