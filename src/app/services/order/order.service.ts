import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Order} from '../../models/order';
import {Product} from '../../models/product/product';
import {map} from 'rxjs/operators';
import {OrderItem, OrderItemI} from '../../models/order-item';
import {Store} from '../../models/store';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderCollection: AngularFirestoreCollection<Order>;
  private orders: Observable<Order[]>;
  constructor(db: AngularFirestore) {
    this.orderCollection = db.collection<Order>('orders');
    this.orders = this.orderCollection.snapshotChanges().pipe(map(actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
  }

  public getOrders() {
    console.log(this.orders);
    return this.orders;
  }

  public addOrder(items: OrderItem[], store: string) {
    const userId = 'pending';
    const sum = 0.0;
    const s: Store = {
      storeName: 'pending',
      id: store,
    };
    console.log(store);
    const order: Order = {
      products: items,
      userId,
      storeId: store,
      totalAmount: sum,
      status: 'approved',
    };
    this.orderCollection.add(order).then(r => console.log(r));
  }
}
