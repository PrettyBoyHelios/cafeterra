import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {Store} from '../models/store';

export interface User {
  name?: string;
  uid?: string;
  img?: string;
  isClient?: boolean;
  store?: Store;
}


@Injectable({
  providedIn: 'root'
})

export class UserInfoService {
  userName: string;
  private userCollection: AngularFirestoreCollection<User>;
  private userList: Observable<User[]>;
  constructor(
      public fAuth: AngularFireAuth,
      private db: AngularFirestore
  ) {
    this.userCollection = db.collection<User>('users');
    this.userList = this.userCollection.snapshotChanges().pipe(map(actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      });
    }));
  }

  getUserInfo() {
    return this.db.collection('users').snapshotChanges().pipe(map(rooms => {
      return rooms.map(a => {
        const data = a.payload.doc.data() as User;
        if (data.uid === this.fAuth.auth.currentUser.uid) {{
          return data.name;
        }
      }
      });
    }));
  }

  getUserType() {
    return this.userCollection.doc<User>(this.fAuth.auth.currentUser.uid).valueChanges();
  }
}
