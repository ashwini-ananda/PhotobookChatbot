import { Component } from '@angular/core';
import { ChatService } from './chat.service';

@Component({
  selector: 'chat-widget',
  templateUrl: '/chat-widget.component.html',
  providers: [ ChatService ],
  styles: [`
    ::ng-deep nb-layout-column {
      justify-content: center;
      display: flex;
    }
    nb-chat {
      width: 500px;
    }
  `],
})
export class ChatWidgetComponent {

  messages: any[];

  constructor(private chatService: ChatService) {
    this.messages = this.chatService.loadMessages();
  }

  sendMessage(event: any) {
    const files = !event.files ? [] : event.files.map((file: { src: any; type: any; }) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'file-text-outline',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: true,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: 'Jonh Doe',
        avatar: 'https://i.gifer.com/no.gif',
      },
    });
    
    /* const botReply = this.chatService.reply(event.message);
    if (botReply) {
      setTimeout(() => { this.messages.push(botReply) }, 500);
    } */

    this.chatService.reply(event.message).subscribe((res:any) => {
      // (res as any).roundInfo[0].userImages.forEach((image: { imagePath: string; }) => {
      //   this.images.push({url:image.imagePath.replace('Images-DB','assets'), common:'no'})
      // });
      //alert(JSON.stringify(this.images));
      this.messages.push({
        text: res.message,
        date: new Date(),
        reply: false,
        type: 'text',
        files: [],
        user: {
          name: 'Bot',
          avatar: 'https://i.gifer.com/no.gif',
        },
      });

    });

  }
}
