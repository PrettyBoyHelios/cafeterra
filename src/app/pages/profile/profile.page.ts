import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit {

  email: string;
  password: string;
  currentUser : any;
  loggedIn = false;
  name: any;

  constructor(private authService: AuthService, private fauthService: AngularFireAuth, public router: Router) { }

  ngOnInit() {
    
    console.log(this.fauthService.auth.currentUser.displayName);
    if(this.currentUser === null){
      console.log("No inicio sesión");
      //this.loggedIn = false;
    }else{
      console.log("Sí inicio sesión");
      //this.loggedIn = true;
    }
    this.loggedIn = this.authService.loggedIn;
  }

  onSubmitLogin()
  {
    this.authService.login(this.email, this.password).then( res =>{
      console.log("Log In exitoso");
      this.name = this.fauthService.auth.currentUser.displayName;
      console.log("name : " + this.name);
      //this.loggedIn = true;
      this.router.navigate(['/tabs/food/']);
    }).catch(err => alert('los datos son incorrectos o no existe el usuario'))
  }

}