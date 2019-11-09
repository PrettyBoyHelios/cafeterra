import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { ToastController } from '@ionic/angular';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isLoggedIn = false;
  public suNombre: any = '';
  isVerified: boolean;
  public clientType: boolean;

  constructor(private userInfoService: UserInfoService,
              private authService: AngularFireAuth,
              private db: AngularFirestore,
              public toastController: ToastController
  ) { }

  login(email: string, password: string) {
    return new Promise((resolve, rejected) => {
      this.authService.auth.signInWithEmailAndPassword(email, password).then(user => {
        this.isLoggedIn = true;
        this.userInfoService.getUserType().subscribe( res => {
          this.clientType = res.isClient;
        });
        if (user.user.emailVerified) {
          this.isVerified = true;
          this.userInfoService.getUserInfo();
          this.suNombre = this.userInfoService.userName;
        } else {
          this.presentToast('Se envió un correo para verificar tu cuenta.', false, 'bottom', 2000);
        }
        resolve(user);
      }).catch(err => rejected(err));
    });
  }

  register(email: string, password: string, name: string) {
    return new Promise ((resolve, reject) => {
      this.authService.auth.createUserWithEmailAndPassword(email, password).then( res => {
        const uid = res.user.uid;
        this.sendEmailVerification();
        this.db.collection('users').doc(uid).set({
          name,
          uid,
          isClient: true
        });
        resolve(res);
      }).catch( err => reject(err));
    });
  }

  logoutUser() {
    return new Promise((resolve, reject) => {
      if (firebase.auth().currentUser) {
        firebase.auth().signOut()
        .then(() => {
          this.isLoggedIn = false;
          resolve();
        }).catch((error) => {
          reject();
        });
      }
    });
  }

  userDetails() {
    return firebase.auth().currentUser;
  }

  sendEmailVerification() {
    this.authService.authState.subscribe(user => {
        user.sendEmailVerification()
        .then(() => {
          this.presentToast('Se ha enviado un correo para verificar tu cuenta.', false, 'bottom', 2000);
        });
      });
  }

  async presentToast(message: string, closeBoton: boolean, position: any, duration: number) {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
      showCloseButton: closeBoton
    });
    await toast.present();
  }
}
