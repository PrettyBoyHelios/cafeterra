import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  public hasEmailVerified: boolean = false;
  public suNombre: any = "";
  isVerified = false;

  constructor(private authService:AngularFireAuth, private db : AngularFirestore, public toastController: ToastController) { }

  login(email:string, password:string){
    return new Promise((resolve, rejected) =>{
      this.authService.auth.signInWithEmailAndPassword(email, password).then(user => {
        this.isLoggedIn = true;
        if(user.user.emailVerified) {
          // Redirect the user here
          console.log("verificado");
          this.isVerified = true;
        } else {
          this.presentToast('Se envió un correo para verificar tu cuenta.', false, 'bottom', 2000);
          // Tell the user to have a look at its mailbox
        }
        resolve(user);
      }).catch(err => rejected(err));
    });
  }

  register(email : string, password : string, name : string){
    return new Promise ((resolve, reject) => {
      this.authService.auth.createUserWithEmailAndPassword(email, password).then( res =>{
        const uid = res.user.uid;
        this.sendEmailVerification();
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

  sendEmailVerification() {
    this.authService.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
          this.presentToast('Se ha enviado un correo para verificar tu cuenta.', false, 'bottom', 2000);
        })
      });
  }

  async presentToast(message: string, closeBoton:boolean, position:any, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      showCloseButton: closeBoton
    });
    toast.present();
  }
}
