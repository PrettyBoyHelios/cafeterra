import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from "@angular/forms";
import { AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { firebaseConfig } from '../environments/environment'

import {Base64ToGallery} from '@ionic-native/base64-to-gallery/ngx';
import {NgxQRCodeModule} from 'ngx-qrcode2';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      FormsModule,
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFirestoreModule,
      AngularFireAuthModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      Base64ToGallery,
      NgxQRCodeModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}