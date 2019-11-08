import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.page.html',
  styleUrls: ['./forgotpassword.page.scss'],
})
export class ForgotpasswordPage implements OnInit {
  public  email : string;
  constructor(private translate: TranslateService, private fauthService: AngularFireAuth, public router: Router, public toastController: ToastController) { 
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
