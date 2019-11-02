import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Order} from '../models/order';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private productCollection: AngularFirestoreCollection<Order>;
  private products: Observable<Order[]>;
  constructor(db: AngularFirestore) {
    this.productCollection = db.collection<Order>('orders');
    this.products = this.productCollection.snapshotChanges().pipe(map(actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
  }

  public getProducts() {
    return this.products;
  }

  public getProduct(id: string) {
    return this.productCollection.doc<Order>(id).valueChanges();
  }
}
