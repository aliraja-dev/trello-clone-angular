import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { switchMap } from "rxjs";
import { Board } from "../interfaces/interfaces";

@Injectable({ providedIn: 'root' })
export class BoardService {

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore) { }

  /**
   * Get all boards owned by the  current logged in user.
   */
  getUserBoards() {
    return this.afAuth.authState.pipe(switchMap(
      user => {
        if (user) {
          return this.afs.collection<Board>('boards', ref => ref.where('userId', '==', user.uid).orderBy('priority', 'desc')).valueChanges({ idField: 'uid' });
        }
        else {
          return [];
        }
      }
    ));
  }
}
