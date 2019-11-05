import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;

  constructor(private authService:AngularFireAuth, private router: Router, private db : AngularFirestore) { }

  login(email:string, password:string){
    return new Promise((resolve, rejected) =>{
      this.authService.auth.signInWithEmailAndPassword(email, password).then(user => {
        this.isLoggedIn = true;
        resolve(user);
      }).catch(err => rejected(err));
    });
  }

  register(email : string, password : string, name : string){
    return new Promise ((resolve, reject) => {
      this.authService.auth.createUserWithEmailAndPassword(email, password).then( res =>{
          // console.log(res.user.uid);
        const uid = res.user.uid;
          this.db.collection('users').doc(uid).set({
            name : name,
            uid : uid
          })
        
        resolve(res)
      }).catch( err => reject(err))
    });
  }

  logoutUser(){
    return new Promise((resolve, reject) => {
      if(firebase.auth().currentUser){
        firebase.auth().signOut()
        .then(() => {
          console.log("Log Out");
          this.isLoggedIn = false;
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    })
  }

  userDetails(){
    return firebase.auth().currentUser;
  }


}