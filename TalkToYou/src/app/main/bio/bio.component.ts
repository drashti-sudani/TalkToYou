import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bio',
  templateUrl: './bio.component.html',
  styleUrls: ['./bio.component.css']
})
export class BioComponent implements OnInit {
  loading=false;
  bio={"1Avtar":"https://i.pinimg.com/736x/b9/2f/2a/b92f2a69aece47cc3d060077713f47c7.jpg",
    "2User Id":"__DSF__",
    "3User Name":"DSF",
    "4About":"Project sample profile",
    "5Mobile number":"1234567890",
    "6School Name":"ADT" ,
    "7Colleage Name":"FTE-MSU"
    }
    id=""
    connected=false
    edit=true
    requsted=true;
  constructor(private _Activatedroute:ActivatedRoute,private http:HttpClient,private route:Router) {
    
   }
   router(){
    if(this.requsted){
    this.route.navigate(['/main/'])
    }
    else{
      this.route.navigate(['/main/addcontacts'])
    }
   }
   toString(){
    return JSON.stringify(this.bio);
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.edit = params.get('edit')==="true";
      if(params.get('msg')==="false"){
        this.requsted=false
      }
        //console.log(this.edit+" "+this.connected)
        //console.log((""+params.get('bio')))
        this.id=""+params.get('bio')
    })
    this.loading=true;
    console.log(this.id)
    let y=this.http.post<any>("http://localhost:8080/getProfile",this.id);
    y.subscribe(
      (data:any)=>{
        //alert(data)
        if(data.charAt(0)!='E'){
          this.bio=JSON.parse(data);
          this.loading=false;
        }
        else{
          //alert(data);
        }
      }
    )
    y=this.http.post<any>("http://localhost:8080/translate",this.id);
    y.subscribe(
      (data:any)=>{
        //alert(data)
        if(data.charAt(0)!='E'){
          //alert(data);
        }
        else{
          //alert(data);
        }
      }
    )
    
  }
  request(){

  }
  widrow(){
    
  }

}
