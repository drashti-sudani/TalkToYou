import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setnewpassword',
  templateUrl: './setnewpassword.component.html',
  styleUrls: ['./setnewpassword.component.css']
})
export class SetnewpasswordComponent implements OnInit {
  password="";
  cpassword="";
  loading=false
  rgp=new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$")
  validation() :string{
    const btn = document.getElementById('btn') as HTMLButtonElement | null;
    btn?.setAttribute('disabled', '');
    if(this.password==""){
      return "Please fill all fields"
    }
    if(this.rgp.test(this.password)==false){
      return "Password is not looking ok!!";
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
    return this.rgp.test(this.password) && this.password==this.cpassword
  }
  submit(){
    this.loading=true;
    let y=this.http.post<any>("http://localhost:8080/updatepassword",localStorage.getItem('userid')+" "+this.password);
    y.subscribe(
      (data:any)=>{
        if(data==='ok'){
          alert("password updated")
          this.route.navigate(['/LogIn']);
        }
        else{
          alert(data)
          this.loading=false
        }
      }
    )
    //this.route.navigate(['/LogIn']);
  }
  constructor(private http:HttpClient,private route:Router) { }

  ngOnInit(): void {
  }

}
