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
  // currentUser : any;
  // loggedIn = false;

  constructor(private authService: AuthService, public router: Router) { }

  ngOnInit() {
    // this.currentUser = this.fauthService.auth.currentUser;
    // console.log(this.currentUser);
    // if(this.currentUser === null){
    //   this.loggedIn = true;
    // }else{
    //   this.loggedIn = false;
    // }
  }

  onSubmitLogin()
  {
    this.authService.login(this.email, this.password).then( res =>{
      console.log("Log In exitoso");
      this.router.navigate(['/tabs/food/']);
    }).catch(err => alert('los datos son incorrectos o no existe el usuario'))
  }

}