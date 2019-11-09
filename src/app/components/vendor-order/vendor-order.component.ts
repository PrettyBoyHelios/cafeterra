import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../../models/order';

@Component({
  selector: 'app-vendor-order',
  templateUrl: './vendor-order.component.html',
  styleUrls: ['./vendor-order.component.scss'],
})
export class VendorOrderComponent implements OnInit {
  private showClient: boolean;
  @Input() order: Order;
  @Input() details: boolean;
  constructor() { }

  ngOnInit() {}

}
