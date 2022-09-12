import { Component, OnInit } from '@angular/core';
import { ChatService } from './services/chat/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public roomId!: string;
  public messageText!: string;
  public messageArray: {user: string, message: string}[] = [];

  public phone!: string;
  public currentUser: any;
  public selectedUser: any;

  public userList = [
    {
      id: 1,
      name: 'Diego',
      phone: '123456789',
      image: 'assets/user/user-1.png',
      roomId: {
        2: 'room-1',
        3: 'room-2',
        4: 'room-3'
      }
    },
    {
      id: 2,
      name: 'Diana',
      phone: '123445678',
      image: 'assets/user/user-2.png',
      roomId: {
        1: 'room-1',
        3: 'room-4',
        4: 'room-5'
      }
    },
    {
      id: 3,
      name: 'Lucas',
      phone: '123455678',
      image: 'assets/user/user-3.png',
      roomId: {
        1: 'room-2',
        2: 'room-4',
        4: 'room-6'
      }
    },
    {
      id: 4,
      name: 'Alef',
      phone: '123456678',
      image: 'assets/user/user-4.png',
      roomId: {
        1: 'room-3',
        2: 'room-5',
        3: 'room-6'
      }
    },
  ]

  constructor(
    private chatService: ChatService
  ) {

    this.chatService.getMessage()
      .subscribe((data: {user: string, message: string}) => {
        this.messageArray.push(data);
      })

  }
  ngOnInit(): void {

    this.currentUser = this.userList[0]

  }

  selectUserHandler(phone: string):void {
    this.selectedUser = this.userList.find(user => user.phone === phone)
    this.roomId = this.selectedUser.roomId[this.selectedUser.id]
    this.messageArray = []

    this.join(this.currentUser.name, this.roomId)
  }

  join(userName: string, roomId: string): void {
    this.chatService.jonRoom({user: userName, roomId })
  }

  sendMessage(): void {
    this.chatService.sendMessage({
      data: this.currentUser.name,
      room: this.roomId,
      message: this.messageText
    })

    this.messageText = ''
  }
}
