import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadService } from 'src/app/file-upload.service';

@Component({
  selector: 'app-add-contacts',
  templateUrl: './add-contacts.component.html',
  styleUrls: ['./add-contacts.component.css']
})
export class AddContactsComponent implements OnInit {
  alluser=[{avtar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q1-Q-J3UxEu-l7X7GwlTbGgImYcKXnnUul4By5_UPg&s',id:'__drashti__',usrname:"drashi",about:'data',status:true},
           {avtar:'https://i.pinimg.com/736x/66/91/ba/6691baab28fa310948508481a2988d70.jpg',id:'__dri__',usrname:"drashi",school:'data',status:false},
           {avtar:'https://i.pinimg.com/736x/66/91/ba/6691baab28fa310948508481a2988d70.jpg',id:'__ti__',usrname:"drashi",clg:'data',status:false},
           {avtar:'https://i.pinimg.com/736x/66/91/ba/6691baab28fa310948508481a2988d70.jpg',id:'__feo__',usrname:"dra",clg:'data',status:false}]
request=[{avtar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q1-Q-J3UxEu-l7X7GwlTbGgImYcKXnnUul4By5_UPg&s',id:'__drashti__',usrname:"drashi",about:'data'},
           {avtar:'https://i.pinimg.com/736x/66/91/ba/6691baab28fa310948508481a2988d70.jpg',id:'__dri__',usrname:"drashi",school:'data'},
           {avtar:'https://i.pinimg.com/736x/66/91/ba/6691baab28fa310948508481a2988d70.jpg',id:'__ti__',usrname:"drashi",clg:'data'},
           {avtar:'https://i.pinimg.com/736x/66/91/ba/6691baab28fa310948508481a2988d70.jpg',id:'__feo__',usrname:"dra",clg:'data'}]
searchTextAll=""
search=""

  constructor(private modalService: NgbModal,private fileUploadService: FileUploadService ,private http:HttpClient,private route:Router) {
    this.searchTextAll=""
    this.search=""
   }

  ngOnInit(): void {
    let y=this.http.post<any>("http://localhost:8080/getuser",localStorage.getItem('userid'));
    y.subscribe(
      (data:any)=>{
        if(data.charAt(0)!='E'){
          this.alluser=JSON.parse(data);
          //console.log(this.alluser)
        }
        else{
          alert(data);
        }
      }
    )
    y=this.http.post<any>("http://localhost:8080/getRequest",localStorage.getItem('userid'));
    y.subscribe(
      (data:any)=>{
        if(data.charAt(0)!='E'){
          this.request=JSON.parse(data);
          //console.log(this.alluser)
        }
        else{
          alert(data);
        }
      }
    )
  }

  confirm(i:any){
    let y=this.http.post<any>("http://localhost:8080/confirmRequest",this.request[i].id+' '+localStorage.getItem('userid'));
    y.subscribe(
      (data:any)=>{
        if(data.charAt(0)!='E'){
          let id=this.request[i].id
          this.request.splice(i,1)
          alert(id+" is added to your contect")
        }
        else{
          alert(data);
        }
      }
    )
  }
  delet(i:any){
    let y=this.http.post<any>("http://localhost:8080/widrowRequest",this.request[i].id+' '+localStorage.getItem('userid'));
    y.subscribe(
      (data:any)=>{
        if(data.charAt(0)!='E'){
          this.request.splice(i,1)
        }
        else{
          alert(data);
        }
      }
    )
  }
  widrow(i:any){
    let y=this.http.post<any>("http://localhost:8080/widrowRequest",localStorage.getItem('userid')+' '+this.alluser[i].id);
    y.subscribe(
      (data:any)=>{
        if(data.charAt(0)!='E'){
          this.alluser[i].status=false;
        }
        else{
          alert(data);
        }
      }
    )
  }
  send(i:any){
    
    let y=this.http.post<any>("http://localhost:8080/sendRequest",localStorage.getItem('userid')+' '+this.alluser[i].id);
    y.subscribe(
      (data:any)=>{
        if(data.charAt(0)!='E'){
          this.alluser[i].status=true;
        }
        else{
          alert(data);
        }
      }
    )
  }
}
