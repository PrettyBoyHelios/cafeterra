import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  public  email : string;
  constructor(private fauthService: AngularFireAuth, public router: Router, public toastController: ToastController) { 
  }

  ngOnInit() {
  }

  onSubmitRecoveryPassword() {
    this.fauthService.auth.sendPasswordResetEmail(this.email)
      .then(data => {
        console.log(data);
        this.presentToast('Se ha enviado un correo para que recuperes tu contraseña', false, 'bottom', 2000);
        this.router.navigateByUrl('/login');
      })
      .catch(err => {
        console.log(` failed ${err}`);
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
