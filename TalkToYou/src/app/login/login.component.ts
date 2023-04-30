import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loading=false;
  type=1
  user=""
  password=""
  warning=""
  rgp=new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$")
  rgu=new RegExp("^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){3,28}(?:[A-Za-z0-9_]))?)$");
  rge = new RegExp('^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$');
  rgn=new RegExp('^[0-9]{10}$');
  change(id:number){
    this.type=id
  }
  goToMain(){
    this.loading=true;
    let y=this.http.post<any>("http://localhost:8080/login",this.type+this.user+" "+this.password);
    y.subscribe(
      (data:any)=>{
        if(data.substring(0,2)==='ok'){
          localStorage.setItem('userid',data.substring(2))
          this.route.navigate(['/main/']);
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
    if(this.user=="" || this.password==""){
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
    if(this.password!=""){
      if(this.rgp.test(this.password)==false){
        this.warning="Password is not ok.."
        return false;
      }
    }
    this.warning=""
    return true;
  }
  constructor(private http:HttpClient,private route:Router) { }

  ngOnInit(): void {
  }

}
