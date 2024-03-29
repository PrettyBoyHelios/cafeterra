import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import {Product, Special} from '../models/product/product';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  private productCollection: AngularFirestoreCollection<Product>;
  private products: Observable<Product[]>;

  private specialCollection: AngularFirestoreCollection<Special>;
  private specials: Observable<Special[]>;
  private specialsProd: Product[];
  constructor(db: AngularFirestore) {
    this.productCollection = db.collection<Product>('products');
    this.products = this.productCollection.snapshotChanges().pipe(map(actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));

    this.specialCollection = db.collection<Special>('specials');
    this.specials = this.productCollection.snapshotChanges().pipe(map(actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
  }

  public getSpecials() {
    this.specials.subscribe( res => {
      res.forEach( x => {
        this.getProduct(x.productId).subscribe( prod => {
          this.specialsProd.push(prod);
        });
      });
      console.log('specials: ', this.specialsProd);
    });
    return this.specials;
  }

  public getProducts() {
    console.log(this.products);
    return this.products;
  }

  public getProduct(id: string) {
    return this.productCollection.doc<Product>(id).valueChanges();
  }

  public addProduct(newProduct: Product) {
    console.log(newProduct);
    newProduct.store.storeName = '';
    this.productCollection.add(newProduct).then(r => console.log(r));
  }

  public removeProduct(id: string) {
    this.productCollection.doc(id).delete().then( r => console.log(r));
  }
}
