import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  loggedIn = false;

  constructor(private authService:AngularFireAuth, private router: Router, private db : AngularFirestore) { }

  login(email:string, password:string){
    return new Promise((resolve, rejected) =>{
      this.loggedIn = true;
      this.authService.auth.signInWithEmailAndPassword(email, password).then(user => {
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

  logout(){
    this.authService.auth.signOut().then(() => {
      this.loggedIn = false;
      this.router.navigate(['/tabs/profile']);
    });
  }
}