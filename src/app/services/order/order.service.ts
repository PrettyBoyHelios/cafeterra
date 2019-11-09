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
    // this.orderCollection.ref.orderBy('timeCreated', 'desc').limit(1); // Apparently this doesn't work. Sort at order page
    this.orders = this.orderCollection.snapshotChanges().pipe(map(actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
  }

  public getOrders() {
    return this.orders;
  }

  public addOrder(items: OrderItem[], store: Store, uid: string) {
    let sum = 0.0;
    /* const s: Store = {
      storeName: 'pending',
      id: store,
    }; */
    let aux = '';
    for (const item of items) {
      sum += item.quantity * item.product.price;
      aux = item.product.storeName;
    }
    const order: Order = {
      nameClient: localStorage.getItem('name'),
      products: items,
      userId: uid,
      store,
      storeName: aux,
      totalAmount: sum,
      status: 'approved',
      timeCreated: Math.round((new Date()).getTime()),
    };
    this.orderCollection.add(order).then(r => console.log(r));
  }
}
