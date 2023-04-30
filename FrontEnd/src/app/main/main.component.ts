
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
  
import {NgbModal, ModalDismissReasons, NgbModalRef} 
      from '@ng-bootstrap/ng-bootstrap';
import { EncrDecrService } from '../encr-decr.service';
import { FileUploadService } from '../file-upload.service';
      
      
  

@Component({
  selector: 'app-main,ngbd-modal-basic',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})

export class MainComponent implements OnInit {
  loading=false;
  imagesrc=""
  closeResult=""
  
  language=["English en","Afrikaans af","Albanian sq", "Amharic am","Arabic ar","Armenian hy","Azerbaijani az","Basque eu",
    "Belarusian be","Bengali bn","Bosnian bs","Bulgarian bg","Catalan ca","Cebuano ceb","Chinese (Simplified) zh-CN",
    "Chinese (Traditional) zh-TW","Corsican co","Croatian hr","Czech cs","Danish da","Dutch nl",
    "Esperanto eo","Estonian et","Finnish fi","French fr","Frisian fy","Galician gl","Georgian ka","German de",
    "Greek el","Gujarati gu","Haitian Creole ht","Hausa ha","Hawaiian haw (ISO-639-2)","Hebrew he**","Hindi hi",
    "Hmong hmn (ISO-639-2)","Hungarian hu","Icelandic is","Igbo ig","Indonesian id","Irish ga","Italian it","Japanese ja",
    "Javanese jw","Kannada kn","Kazakh kk","Khmer km","Korean ko","Kurdish ku","Kyrgyz ky","Lao lo","Latin la","Latvian lv",
    "Lithuanian lt","Luxembourgish lb","Macedonian mk","Malagasy mg","Malay ms","Malayalam ml","Maltese mt","Maori mi",
    "Marathi mr","Mongolian mn","Myanmar (Burmese) my","Nepali ne","Norwegian no","Nyanja (Chichewa) ny","Pashto ps",
    "Persian fa","Polish pl","Portuguese (Portugal, Brazil) pt","Punjabi pa","Romanian ro","Russian ru","Samoan sm",
    "Scots Gaelic gd","Serbian sr","Sesotho st","Shona sn","Sindhi sd","Sinhala (Sinhalese) si","Slovak sk",
    "Slovenian sl","Somali so","Spanish es","Sundanese su","Swahili sw","Swedish sv","Tagalog (Filipino) tl",
    "Tajik tg","Tamil ta","Telugu te","Thai th","Turkish tr","Ukrainian uk","Urdu ur","Uzbek uz","Vietnamese vi",
    "Welsh cy","Xhosa xh","Yiddish yi","Yoruba yo","Zulu zu"]
    sourcelanguage=this.language[0]
  id=localStorage.getItem('userid')
  connection=[
    {iid:'You have no connection',aavtar:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6Q1-Q-J3UxEu-l7X7GwlTbGgImYcKXnnUul4By5_UPg&s',Notification:0},
  ]
    chat=[[],
    ["eHii DSF",'sHello Ananya...How are you?','rI am fine..What about you??','sI am slos fine...'],[],[],[],[],[],[]]
    index=0;
    public textArea: string = '';
    filterTerm!: string;
   public isEmojiPickerVisible= false;
   public file:File=new File([],"");
   modalReference:any;
   searchText = '';
   onChange(event:any) {
    this.file = event.target.files[0];
  }
  //  public addEmoji(event) {
  //     this.textArea = `${this.textArea}${event.emoji.native}`;
  //     this.isEmojiPickerVisible = false;
  //  }
  emoji=false;
  load(){
    
  }
  public addEmoji(event:EmojiEvent) {
   // console.log(1);
    this.textArea = `${this.textArea}${event.emoji.native}`;
    this.isEmojiPickerVisible = false;
 }
  emojiV(){
    this.emoji=!this.emoji;
    //console.log(this.emoji);
  }
  

  constructor(private modalService: NgbModal,private fileUploadService: FileUploadService ,private EncrDecr: EncrDecrService,private http:HttpClient,private route:Router) {
    this.searchText=""
    
    
   }
  toString(h:object){
    return JSON.stringify(h);
  }
  displayMsg(i:number){
    //console.log(i)
    this.index=i;
    if(this.connection[this.index].Notification==0){
      return;
    }
    let y=this.http.post<any>("http://localhost:8080/resetnotification",this.id+' '+this.connection[i].iid);
    y.subscribe(
      (data:any)=>{
        if(data==='ok'){
          this.connection[i].Notification=0;
        }
        else{
          alert(data);
        }
      }
    )
  }
  ngOnInit(): void {
    let y=this.http.post<any>("http://localhost:8080/getavtar",this.id);
    y.subscribe(
      (data:any)=>{
        //alert(data)
        this.imagesrc=data;
      }
    )
    
    y=this.http.post<any>("http://localhost:8080/getconnection",this.id);
    y.subscribe(
      (data:any)=>{
        //alert(data)
        this.connection=JSON.parse(data);
        //console.log(this.connection)
        this.connection.forEach((element, index) => {
          let x=this.http.post<any>("http://localhost:8080/getmessage",this.id+" "+element.iid);
          x.subscribe(
            (c:any)=>{
              this.chat[index]=JSON.parse(c)
              this.chat[index].forEach((element, i) => {
                // 👇️ one 0, two 1, three 2
                this.chat[index][i]=this.chat[index][i].charAt(0)+this.EncrDecr.get('1233331234567890', this.chat[index][i].substring(1));
              });
            }
          )
        });
      }
    )
    if(this.connection.length>0){
    this.displayMsg(0);
    }
  }
  open(content:any) {
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  sendF(){
    this.loading=true;
    document.getElementById("close")?.click()
    if(this.file.name==="")
      return;
        this.fileUploadService.upload(this.file).subscribe(
            (event: any) => {
                if (typeof (event) === 'object') {
  
                    // Short link via api response
                    let y=this.http.post<any>("http://localhost:8080/sendfile",{"sender":this.id,"receiver":this.connection[this.index].iid,"filelink": this.EncrDecr.set('1233331234567890',event.link+" "+this.file.name)});
                    y.subscribe(
                      (data:any)=>{
                        if(data==='ok'){
                          let i=this.chat[this.index].length;
                          this.chat[this.index][i]='s'+ event.link+" "+this.file.name;
                          console.log(this.chat[this.index][i].substring(1,5)==='http' && this.chat[this.index][i].length>4)
                          console.log(event.link)
                          this.file=new File([],"")
                          this.textArea="";
                          this.emoji=false  
                          this.loading=false;
                        }
                        else{
                          alert(data)
                          this.textArea="";
                          this.emoji=false  
                          this.loading=false;
                        }
                      }
                    )
                    
                }
            }
        );
      
  }
  send(){
    if(this.textArea==='')
      return ;
    
    let y=this.http.post<any>("http://localhost:8080/sendmessage",this.id+' '+this.connection[this.index].iid+' '+this.EncrDecr.set('1233331234567890', this.textArea));
    y.subscribe(
      (data:any)=>{
        if(data==='ok'){
          let i=this.chat[this.index].length;
          this.chat[this.index][i]='s'+this.textArea;
          this.textArea="";
          this.emoji=false
        }
        else{
          alert(data)
        }
      }
    )
  }
  traslate(){
    this.loading=true
    var e = (document.getElementById("languagesource")) as HTMLSelectElement;
    var sel = e.selectedIndex;
    var opt = e.options[sel];
    e = (document.getElementById("languagetarget")) as HTMLSelectElement;
    let y=this.http.post<any>("http://localhost:8080/translate","q="+this.textArea+ "&target="+this.language[e.selectedIndex].substring(this.language[e.selectedIndex].lastIndexOf(' ')+1)+"&source="+this.language[sel].substring(this.language[sel].lastIndexOf(' ')+1));
    y.subscribe(
      (data:any)=>{
        //alert(data)
        this.loading=false
        if(data.charAt(0)!='E'){
          this.textArea=data;
        }
        else{
          alert(data);
        }
      }
    )
  }
  
  copy(l:string){
    this.textArea=l
  }

}
