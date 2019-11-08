import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { UserInfoService } from "../../services/user-info.service";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

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

  constructor(private translate: TranslateService, public toastController: ToastController, public userInfoService: UserInfoService, private db : AngularFirestore, private authService: AuthService, private fauthService: AngularFireAuth, public router: Router) { 
    this.getName();
  }

  ngOnInit(){   
    this.getName();
  }

  ionViewWillEnter(){
    this.getName();
  }

  onSubmitLogin()
  {
    this.authService.login(this.email, this.password).then( res =>{
      this.isLoggedIn = true;
      this.hasEmailVerification = this.authService.isVerified;
      this.getName();
      this.router.navigate(['/tabs/food/']);
    }).catch(err => this.presentToast('Por favor verifique sus datos y que el usuario exista.', false, 'bottom', 2000));
  }

  Onlogout(){
    this.reload();
  }

  reload() {
    this.getName();
    window.location.reload();
  }

  async getName(){
    this.userInfoService.getUserInfo().subscribe( user => {
      this.userNameFromAuth = user[0];
    })
  }

  async presentToast(message: string, closeBoton:boolean, position:any, duration: number) {
    let message_translated:string = this.translate.instant(message);
    const toast = await this.toastController.create({
      message: message_translated,
      duration: duration,
      position: position,
      showCloseButton: closeBoton
    });
    toast.present();
  }
}