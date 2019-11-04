import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})

export class FoodPage implements OnInit {
  hasVerifiedEmail = true;
  sentTimestamp;

  constructor(public aufAuth : AngularFireAuth) { 
    this.aufAuth.authState.subscribe(user =>{
      if(user){
        this.hasVerifiedEmail = this.aufAuth.auth.currentUser.emailVerified;
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
}
