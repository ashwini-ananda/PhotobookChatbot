import { HttpClient } from '@angular/common/http';
import { Component, Directive, HostListener, OnInit } from '@angular/core';
import { ChatService } from './chat-widget/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ChatService],
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'chatbot';
  img4="assets/person_elephant/COCO_train2014_000000204759.jpg";
  timeSpent: number =0;
  date: Date;
  roundInfo:{round:number,userImages:{imageId:number, imagePath:string}[]}[] =[];
  round:number = 0;
  images:{url:string, common:string, imageId:number}[] = [];
  constructor(private chatService: ChatService, private http: HttpClient) { 
    this.date = new Date();
    setInterval(() => { this.timeSpent++ }, 1 * 1000);
    this.http.get("http://127.0.0.1:8000/api/users/"+this.chatService.round);
    this.chatService.getImages().subscribe((res) => {

      this.roundInfo = (res as any).roundInfo;
      //select round one when load to images
      this.round++;
      this.roundInfo.find((roundInfo)=>{return roundInfo.round === this.round})?.userImages.forEach((image) => {
        this.images.push({url:image.imagePath.replace('Images-DB','assets'), common:'no', imageId:image.imageId})
      });




      // (res as any).roundInfo[0].userImages.forEach((image: { imagePath: string; }) => {
      //   this.images.push({url:image.imagePath.replace('Images-DB','assets'), common:''})
      // });

      //alert(JSON.stringify(this.images));
    }
      //alert(JSON.stringify((res as any).roundInfo[0].userImages)
    );
    // setInterval(()=> {  this.timeSpent= new Date().getTime() - this.date.getTime(); }, 1 * 1000);

    //Observable.interval(1000).map(() => new Date()).subscribe(res => this.timeSpentMs = res)
    //this.time$ = Observable.interval(1000).map(() => new Date())
  }
  /* submitSelection(images:any){
    var response:any = [];
    images.forEach((element: { [x: string]: string; }) => {
      if(element['common'].toString() == "true") {
        response.push({url:element['imagePath'].replace('assets','Images-DB')})
      }
    });
    this.http.put("http://127.0.0.1:8000/api/game/round/"+this.chatService.round,response);
    var roundNumber:number = this.chatService.round;
    roundNumber= roundNumber+1;
    this.chatService.round = roundNumber;

    setInterval(() => { this.timeSpent++ }, 1 * 1000);
    this.images = [];
    this.http.get("http://127.0.0.1:8000/api/users/"+this.chatService.round);
    this.chatService.getImages().subscribe((res) => {
      (res as any).roundInfo[0].userImages.forEach((image: { imagePath: string; }) => {
        this.images.push({url:image.imagePath.replace('Images-DB','assets'), common:''})
      });
    }
    );

  } */
 
  submitSelection() {
    this.round++;
    if(this.round > 5){
      this.round = 1;
    }
    let submitRequest:{imageId:number,imagePath:string}[] = [];
    this.images.forEach((image) => {
      if(image.common === 'yes') {
      submitRequest.push({imagePath:image.url.replace('assets','Images-DB'), imageId:image.imageId})
      }
    });
    this.images = [];
    this.roundInfo.find((roundInfo)=>{return roundInfo.round === this.round})?.userImages.forEach((image) => {
      this.images.push({url:image.imagePath.replace('Images-DB','assets'), common:'no',imageId:image.imageId})
    });
    this.chatService.submitImages(this.round,submitRequest);
    
  }

  onSelectionChange(image:any) {
    image.common = image.common === 'yes' ? 'no' : 'yes';
  }
}
