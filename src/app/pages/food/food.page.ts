import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Order} from '../../models/order';
import {Product} from '../../models/product/product';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
})
export class FoodPage implements OnInit {
  private products: Product[];
  constructor(private prodService: ProductService) {}

  ngOnInit() {
    this.prodService.getProducts().subscribe( res => {
      console.log(res);
      this.products = res;
    });
  }

}
