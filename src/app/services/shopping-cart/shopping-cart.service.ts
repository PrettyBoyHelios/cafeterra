import { Injectable } from '@angular/core';
import {OrderItem} from '../../models/order-item';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private orderBuilder: OrderItem[];
  constructor() { }
}
