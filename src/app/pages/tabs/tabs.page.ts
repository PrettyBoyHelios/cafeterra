import { Component, OnInit } from '@angular/core';
import {ShoppingCartService} from '../../services/shopping-cart/shopping-cart.service';
import {UserInfoService} from '../../services/user-info.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(
      private shopService: ShoppingCartService,
      private userInfoService: UserInfoService,
  ) { }

  ngOnInit() {
  }

}
