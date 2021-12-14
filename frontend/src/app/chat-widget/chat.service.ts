import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ChatService {
    round = 1;
    constructor(private http: HttpClient) { }
    reply(message:string) {
        // return {
        //   text: "Message Added",
        //   date: new Date(),
        //   reply: false,
        //   type: 'text',
        //   files: [],
        //   user: {
        //     name: 'Bot',
        //     avatar: 'https://i.gifer.com/no.gif',
        //   },
        // }
      return this.http.post("http://127.0.0.1:8000/api/messages",{"sender": 2, "roundId": this.round, "receiver": 1, "message": message});
      // return this.http.get("http://127.0.0.1:8000/api/messages/1/1")
      // let response = this.http.post("http://127.0.0.1:8000/api/messages",message).toPromise();
      // return response;

    }
    loadMessages() {
      this.getImages();
      return [{
        text: "Hello!",
        date: new Date(),
        reply: false,
        type: 'text',
        files: [],
        user: {
          name: 'Bot',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },{
        text: "Hi",
        date: new Date(),
        reply: true,
        type: 'text',
        files: [],
        user: {
          name: 'John Doe',
          avatar: 'https://i.gifer.com/no.gif',
        },
      },{
        text: "Let's start",
        date: new Date(),
        reply: false,
        type: 'text',
        files: [],
        user: {
          name: 'Bot',
          avatar: 'https://i.gifer.com/no.gif',
        },
      }]
       // return [] as any[];
        //return this.http.get<any[]>('get url');
      }

    getImages() {
       return this.http.get("http://127.0.0.1:8000/api/game/new/"+this.round)
      //.subscribe((res)=>(alert(JSON.stringify((res as any).roundInfo[0].userImages))));
    } 
    
    submitImages(roundId:number, images:any) {
      this.http.put('http://127.0.0.1:8000/api/game/round/'+roundId.toString(),images);
    }
}
