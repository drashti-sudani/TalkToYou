import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-bio',
  templateUrl: './set-bio.component.html',
  styleUrls: ['./set-bio.component.css']
})
export class SetBioComponent implements OnInit {
  type=1
  user=""
  birthdate=''
  id="userid"
  bio={id:"user id",name:"name",SchoolName:"",ColleeageName:"",number:"1234567890",eamilid:"emailid"}
  edit1(){
    console.log("Hello")
  }
  setDefault(){
    this.id="__DRASHTI___"
    this.bio.name="Drashti"
    this.birthdate='22/03/2002'
  }
  view(){
    return this.birthdate+" "+this.id+this.bio.name;
  }
  constructor() {
    this.id="userId"
   }

  ngOnInit(): void {
  }

}
