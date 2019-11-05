import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Product} from '../models/product/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private productCollection: AngularFirestoreCollection<Product>;
  private products: Observable<Product[]>;
  constructor(db: AngularFirestore) {
    this.productCollection = db.collection<Product>('products');
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
    return this.productCollection.doc<Product>(id).valueChanges();
  }
}
