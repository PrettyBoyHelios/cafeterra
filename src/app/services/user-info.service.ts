import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { AngularFireAuth } from '@angular/fire/auth';

export interface user {
  name : string
  id: string
  img : string
  isClient: boolean
}


@Injectable({
  providedIn: 'root'
})

export class UserInfoService {
  userName: string;

  constructor(public fauth: AngularFireAuth, private db : AngularFirestore) { }

  getUserInfo(){
    return this.db.collection('users').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a =>{
        const data = a.payload.doc.data() as user;
        if(data['uid'] === this.fauth.auth.currentUser.uid){{
          return data['name'];
        }
      }

      })
    }))
  }
}