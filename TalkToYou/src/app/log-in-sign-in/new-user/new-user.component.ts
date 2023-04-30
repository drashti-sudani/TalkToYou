import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {
  //when page is conect api
  loading=false;
  username="";
  password="";
  cpassword="";
  rgp=new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$")
  rgu=new RegExp("^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){3,28}(?:[A-Za-z0-9_]))?)$");
  validation() :string{
    const btn = document.getElementById('btn') as HTMLButtonElement | null;
    btn?.setAttribute('disabled', '');
    if(this.username==""){
      return "Please fill all fields"
    }
    if(this.rgu.test(this.username)==false){
      return "user name is not valid!"
    }
    if(this.password==""){
      return "Please fill all fields"
    }
    if(this.password.length<8 || this.password.length>20){
      return "Password length must be betwen 8 to 20!!"
    }
    if(this.rgp.test(this.password)==false){
      return "Password must contain one lowercase latter,one upercase latter,one number!!";
    }
    if(this.cpassword==""){
      return "Please fill all fields"
    }
    if(this.cpassword!=this.password){
      return "both passwords are not same!!"
    }
    btn?.removeAttribute('disabled');
    return "";
  }
  isDisabled():boolean{
    return this.rgu.test(this.username) && this.rgp.test(this.password) && this.password==this.cpassword
  }
  constructor(private route:Router,private http:HttpClient) { 
    //console.log(localStorage.getItem('varified'))
    if(localStorage.getItem('varified')==null || localStorage.getItem('varified')=='null' || localStorage.getItem('varified')=='false'){
      //uncomment below code after testing is over
      this.route.navigate(['LogIn-SignIn/OTP/']);
    }
    let head = new HttpHeaders();
    head.append('Access-Control-Allow-Headers', 'Content-Type');
    head.append('Access-Control-Allow-Methods', 'GET,POST');
    head.append('Access-Control-Allow-Origin', '*');
  }
  submit(){
    this.loading=true;
    let check=true;
    let x=this.http.post<any>("http://localhost:8080/checkId",this.username);
    x.subscribe(
      data=>{
        //console.log(data)
        if(data==false){
          check=false;
          alert("This userId is already registered...Please use some othe Id")
          this.loading=false;
          return;
        }
        else{
          console.log("adduser start")
          let y=this.http.post<any>("http://localhost:8080/user",{
            "userid":this.username,
            "password":this.password,
            "avtar":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q1-Q-J3UxEu-l7X7GwlTbGgImYcKXnnUul4By5_UPg&s",
            "username":"",
            "about":"",
            "mobilenumber":(localStorage.getItem('ragistrationtype'))==='mobilenumber'?localStorage.getItem('register'):"",
            "schoolname":"",
            "colleagename":"",
            "ragistrationtype":localStorage.getItem('ragistrationtype'),
          "register":localStorage.getItem('register')

        });
        y.subscribe(
          data=>{
            console.log(data);
            localStorage.setItem('userid',this.username)
            this.route.navigate(['main']);
          }
        )
        console.log("Add user end")
        }
      }
    )
    this.loading=false;
  }
  ngOnInit(): void {
  }

}
