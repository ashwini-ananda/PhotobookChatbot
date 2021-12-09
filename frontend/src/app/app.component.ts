import { HttpClient } from '@angular/common/http';
import { Component, Directive, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  images:{url:string, common:string}[] = [];
  constructor(private chatService: ChatService, private http: HttpClient) { 
    this.date = new Date();
    setInterval(() => { this.timeSpent++ }, 1 * 1000);
    this.http.get("http://127.0.0.1:8000/api/users/1");
    this.chatService.getImages().subscribe((res) => {
      (res as any).roundInfo[0].userImages.forEach((image: { imagePath: string; }) => {
        this.images.push({url:image.imagePath.replace('Images-DB','assets'), common:'no'})
      });
      //alert(JSON.stringify(this.images));
    }
      //alert(JSON.stringify((res as any).roundInfo[0].userImages)
    );
    // setInterval(()=> {  this.timeSpent= new Date().getTime() - this.date.getTime(); }, 1 * 1000);

    //Observable.interval(1000).map(() => new Date()).subscribe(res => this.timeSpentMs = res)
    //this.time$ = Observable.interval(1000).map(() => new Date())
  }
 
  
}
