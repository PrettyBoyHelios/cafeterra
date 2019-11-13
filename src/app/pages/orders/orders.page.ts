import { Component, OnInit, ViewChild } from '@angular/core';
import {Order} from '../../models/order';
import {Product} from '../../models/product/product';
import {OrderService} from '../../services/order/order.service';
import {ModalController} from '@ionic/angular';
import {OrderDetailPage} from '../order-detail/order-detail.page';
import { AuthService } from '../../services/auth.service'
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { BehaviorSubject } from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserInfoService} from '../../services/user-info.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {
  private isClient: boolean;
  private orders: Order[] = [];
  private options: BarcodeScannerOptions;
  private orderScanned: Order;

  @ViewChild('scanner', { static: false })
  scanner: ZXingScannerComponent;
  availableDevices: MediaDeviceInfo[];
  currentDevice: MediaDeviceInfo = null;

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.CODE_128,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.EAN_13,
    BarcodeFormat.QR_CODE,
  ];
  hasDevices: boolean;
  hasPermission: boolean;

  qrResultString: string;
  torchEnabled = false;
  torchAvailable$ = new BehaviorSubject<boolean>(false);
  tryHarder = false;
  private userUid: string;

  private showClient: boolean;

  // Vendor Variables

  constructor(
      private orderService: OrderService,
      public modalController: ModalController,
      private authservice: AuthService,
      private barcodeScanner: BarcodeScanner,
      public fAuth: AngularFireAuth,
      private db: AngularFirestore,
      public userInfoService: UserInfoService,
  ) {
    this.isClient = authservice.clientType;
  }

  getBackCamera() {
    return this.scanner.autostart;
  }

  ngOnInit() {
    this.orderService.getOrders().subscribe( res => {
      res.sort((a, b) => {
        if (a.timeCreated > b.timeCreated) {
          return -1;
        }
        if (b.timeCreated > a.timeCreated) {
          return 1;
        }
        return 0;
      });
      this.orders = res;
    });

    this.userInfoService.getUserType().subscribe( res => {
      this.userUid = res.uid;
    });

    this.showClient = (localStorage.getItem('showClient') === 'true');
  }

  async showOrderDetails(o: Order) {
    const modal = await this.modalController.create({
      component: OrderDetailPage,
      componentProps: {
        order: o,
        details: true,
      }
    });
    return await modal.present();
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices;
    this.hasDevices = Boolean(devices && devices.length);
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
  }

  onDeviceSelectChange(selected: string) {
    const device = this.availableDevices.find(x => x.deviceId === selected);
    this.currentDevice = device || null;
  }

  openFormatsDialog() {
    const data = {
      formatsEnabled: this.formatsEnabled,
    };


  }

  onHasPermission(has: boolean) {
    this.hasPermission = has;
  }

  openInfoDialog() {
    const data = {
      hasDevices: this.hasDevices,
      hasPermission: this.hasPermission,
    };

  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false);
  }

  toggleTorch(): void {
    this.torchEnabled = !this.torchEnabled;
  }

  toggleTryHarder(): void {
    this.tryHarder = !this.tryHarder;
  }

  getOrder() {
    this.orderService.getOrder(this.qrResultString).subscribe( res => {
      this.orderScanned = res;
      console.log(res);
    })
    console.log("orden " + this.orderScanned);
  }
}
