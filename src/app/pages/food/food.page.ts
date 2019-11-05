import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})

export class FoodPage implements OnInit {
  hasVerifiedEmail = true;
  sentTimestamp;
//  loggedIn = false;

  constructor(private authService:AuthService, private aufAuth : AngularFireAuth, public router: Router) { 
    this.aufAuth.authState.subscribe(user =>{
      if(user){
        this.hasVerifiedEmail = this.aufAuth.auth.currentUser.emailVerified;
    //    this.loggedIn = true;
      }
      
    });
  }

  ngOnInit() {
  }

  sendVerificationEmail() {
    this.aufAuth.auth.currentUser.sendEmailVerification();
    this.sentTimestamp = new Date();
  }

  reload() {
    window.location.reload();
  }

  Onlogout(){
    console.log("Saliste de la sesión");
    this.authService.logout();
    //this.loggedIn = false;
  }
}
