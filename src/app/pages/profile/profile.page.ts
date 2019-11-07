import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { UserInfoService } from "../../services/user-info.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { FirebaseAuth } from '@angular/fire';
import { AngularFirestore } from "@angular/fire/firestore";
import { async } from 'rxjs/internal/scheduler/async';
import { Subject } from 'rxjs';

import { ModalController } from "@ionic/angular";
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  email: string = "";
  userEmail: string;
  password: string;
  currentUser : any;
  isLoggedIn : boolean;
  userNameFromAuth : string;
  public hasEmailVerification : boolean = true;

  constructor(public userInfoService: UserInfoService, private db : AngularFirestore, public userService: UserInfoService, private authService: AuthService, private fauthService: AngularFireAuth, public router: Router) { 
    //this.hasEmailVerification = this.authService.isVerified;
    //this.hasEmailVerification = fauthService.auth.currentUser.emailVerified;
    //console.log("verified: "+this.hasEmailVerification);
    // //this.isLoggedIn = this.authService.isLoggedIn;
    // fauthService.auth.onAuthStateChanged(function(user) {
    //   if (user) {
    //     this.loggedIn = this.authService.isLoggedIn;
    //     this.userEmail = this.authService.userDetails().email;
    //     this.userNameFromAuth = this.userInfoService.userName;
    //     //this.hasEmailVerification = this.fauthService.auth.currentUser.emailVerified;
    //     // User is signed in.
    //   } else {
    //     console.log("notlogged")
    //     // No user is signed in.
    //   }
    // });
  }

  ngOnInit(){   
    // this.userNameFromAuth = this.userInfoService.userName;
    // this.isLoggedIn = this.authService.isLoggedIn;
    //this.userEmail = this.authService.userDetails().email;
  }

  ionViewWillEnter(){
    // this.isLoggedIn = this.authService.isLoggedIn;
    // this.userEmail = this.authService.userDetails().email;
    // this.userNameFromAuth = this.userInfoService.userName;
    //this.hasEmailVerification = this.fauthService.auth.currentUser.emailVerified;
    //this.userNameFromAuth = this.authService.userName;
    //this.userName = this.authService.userDetails().email.split('@')[0];
    //this.userName = this.authService.userDetails().displayName;
    //this.userName = user.displayName;
    //console.log(this.userNameFromAuth + " - " + this.userEmail + " - " + this.loggedIn);
  }

  onSubmitLogin()
  {
    this.authService.login(this.email, this.password).then( res =>{
      //console.log("Log In exitoso");
      this.isLoggedIn = true;
      this.hasEmailVerification = this.authService.isVerified;
      this.userNameFromAuth = this.userInfoService.userName;
      this.router.navigate(['/tabs/food/']);
      if(!this.fauthService.auth.currentUser.emailVerified)
        console.log("Please verify");
    }).catch(err => alert('los datos son incorrectos o no existe el usuario'))

  }

  Onlogout(){
    console.log("Saliste de la sesión");
    this.authService.logoutUser();
    this.reload();
    //this.router.navigate(['/tabs/profile/']);
  }

  reload() {
    window.location.reload();
  }
}