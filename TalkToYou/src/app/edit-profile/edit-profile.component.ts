import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FileUploadService } from '../file-upload.service';
import { ImageService } from '../image.service';
class ImageSnippet {
  pending: boolean = false;
  status: string = 'init';

  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  selectedFile=new ImageSnippet('/assets/',new File([],""))
  public file:File=new File([],"");

  imagesrc=""
  closeResult=""
  onChange(event:any) {
    this.file = event.target.files[0];
  }
  img=""
  open(content:any) {
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    });
  }
  specialize_with(o:any, S:any) { for (var prop in S) { o[prop] = S[prop]; } }
  setAtar(){
    console.log(this.file.name)
    this.img="assets/"+this.file.name
    let x={"1Avtar":"assets/"+this.file.name }
    this.specialize_with(this.bio, x);
    document.getElementById("close")?.click()
    console.log(this.bio)
  }
  loading=false
  bio={Avtar:""}
  id=localStorage.getItem('userid')
  warning="jgh";  
  rgn=new RegExp('^[0-9]{10}$');
  rgu=new RegExp("^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){3,28}(?:[A-Za-z0-9_]))?)$");
  constructor(private modalService: NgbModal,private fileUploadService: FileUploadService,private _Activatedroute:ActivatedRoute,private http:HttpClient,private route:Router,private imageService: ImageService) {
    this._Activatedroute.paramMap.subscribe(params => { 
       // console.log(JSON.parse(""+params.get('bio')))
        this.bio=JSON.parse(""+params.get('bio'))
  });
}
 
toString(){
  return JSON.stringify(this.bio);
}
edit():boolean{
  //console.log("Hello");
  //const box = document.getElementById(s) as HTMLInputElement | null;
  var number=document.getElementById('Mobile number')  as HTMLInputElement | null;
  //this.warning=""
  if(number !=null &&!this.rgn.test(number.value)){
    this.warning="Mobile number is not valid!!"
    return false;
  }
  number=document.getElementById('User Name')  as HTMLInputElement | null;
  if(number!=null && number.value==''){
    this.warning="User name can't be empty!!"
    return false;
  }
  if(number!=null && number.value.length>100){
    this.warning='User name can\'t contain more than 100 character'
    return false;
  }
  number=document.getElementById('User Id')  as HTMLInputElement | null;
  if(number!=null && this.rgu.test(number.value)==false){
    this.warning="User id is not valid!!"
    return false;
  }
  number=document.getElementById('About')  as HTMLInputElement | null;
  if(number!=null && number.value.length>100){
    this.warning="About can\'t contain more than 100 character"
    return false;
  }
  number=document.getElementById('School Name')  as HTMLInputElement | null;
  if(number!=null && number.value.length>100){
    this.warning="School Name can\'t contain more than 100 character"
    return false;
  }
  number=document.getElementById('Colleage Name')  as HTMLInputElement | null;
  if(number!=null && number.value.length>100){
    this.warning="Colleage Name can\'t contain more than 100 character"
    return false;
  }
  this.warning=""
  return true

}
  ngOnInit(): void {
    let l1=document.getElementById('User ID') as HTMLInputElement | null;
    l1?.setAttribute('enabled','false');
    if(l1!=null){
    l1.value="HELLO"
    }
    
  }
  submit(){
    this.loading=true
    let userid=""
    let username=""
    let about=""
    let School=""
    let Colleage=""
    let mobile="";
    let number=document.getElementById('User Id')  as HTMLInputElement | null;
    if(number!=null){
      userid=number.value
    }
    number=document.getElementById('User Name')  as HTMLInputElement | null;
    if(number!=null){
      username=number.value
    }
    number=document.getElementById('About')  as HTMLInputElement | null;
    if(number!=null){
      about=number.value
    }
    number=document.getElementById('Mobile Numer')  as HTMLInputElement | null;
    if(number!=null){
      mobile=number.value
    }
    number=document.getElementById('School Name')  as HTMLInputElement | null;
    if(number!=null){
      School=number.value
    }
    number=document.getElementById('Colleage Name')  as HTMLInputElement | null;
    if(number!=null){
      Colleage=number.value
    }
    console.log("In submit")
    let y:any
    if(this.img.length==0){
      y=this.http.post<any>("http://localhost:8080/editProfile",{"userid":localStorage.getItem('userid'),"username":username,"about":about,"mobilenumber":mobile,"schoolname":School,"colleagename":Colleage});
    }
    else{
      y= this.http.post<any>("http://localhost:8080/editProfile",{"userid":localStorage.getItem('userid'),"username":username,"about":about,"mobilenumber":mobile,"schoolname":School,"colleagename":Colleage,"avtar":this.img});
    }
   
    y.subscribe(
      (data:any)=>{
        //alert(data)
        if(data.charAt(0)!='E'){
          //this.bio=JSON.parse(data);
          this.route.navigate(['main/Bio','true',this.id,'false']);
          this.loading=false;
        }
        else{
          alert(data);
          this.loading=true
        }
      }
    )
  }
  private onSuccess() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'ok';
  }

  private onError() {
    this.selectedFile.pending = false;
    this.selectedFile.status = 'fail';
    this.selectedFile.src = '';
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      this.selectedFile = new ImageSnippet(event.target.result, file);

      this.selectedFile.pending = true;
      this.imageService.uploadImage(this.selectedFile.file).subscribe(
        (res) => {
          this.onSuccess();
        },
        (err) => {
          this.onError();
        })
    });

    reader.readAsDataURL(file);
  }
}
