import { Injectable } from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";
import { map } from "rxjs/operators";
import { firestore } from 'firebase';

import { Component, OnInit } from '@angular/core';
import { ModalController } from "@ionic/angular";
import { ActionSheetController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

export interface user {
  name : string
  id: string
  img : string
}


@Injectable({
  providedIn: 'root'
})

export class UserInfoService {
  userName: string;

  constructor(public fauth: AngularFireAuth, private db : AngularFirestore) { }

  getUserInfo(){
    return this.db.collection('users').snapshotChanges().pipe(map(users => {
      return users.map(a =>{
        const data = a.payload.doc.data() as user;
        if(a.payload.doc.id === this.fauth.auth.currentUser.uid){
          this.userName = a.payload.doc.data()["name"];
        }
        return data;
      })
    }))
  }
}
