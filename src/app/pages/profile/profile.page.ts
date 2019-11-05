import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { FirebaseAuth } from '@angular/fire';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {
  userEmail: string;
  email: string;
  password: string;
  currentUser : any;
  loggedIn : boolean;
  userName: string;

  constructor(private authService: AuthService, private fauthService: AngularFireAuth, public router: Router) { }

  ngOnInit(){
    this.loggedIn = this.authService.isLoggedIn;
    console.log("loggeado: " + this.loggedIn);
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
      this.userName = this.authService.userDetails().displayName;
      console.log(this.userName + " - " + this.userEmail);
    }else{
      this.router.navigate(['/tabs/profile/']);
    }
  }

  ionViewWillEnter(){
    this.loggedIn = this.authService.isLoggedIn;
    this.userEmail = this.authService.userDetails().email;
    this.userName = this.authService.userDetails().email.split('@')[0];
    console.log(this.userName + " - " + this.userEmail + " - " + this.loggedIn);
  }

  onSubmitLogin()
  {
    this.authService.login(this.email, this.password).then( res =>{
      console.log("Log In exitoso");
      //this.loggedIn = true;
      this.router.navigate(['/tabs/food/']);
    }).catch(err => alert('los datos son incorrectos o no existe el usuario'))
  }

}