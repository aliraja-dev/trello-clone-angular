import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";

import { arrayRemove } from 'firebase/firestore';
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
          return this.afs.collection<Board>('boards', ref => ref.where('userId', '==', user.uid)
            //TODO add sorting by priority
            // .orderBy('priority', 'desc')).
          ).valueChanges({ idField: 'uid' });
        }
        else {

          return [];
        }
      }
    ));
  }

  /**
   * Create a new board for the user
  */
  async createBoard(board: Board) {
    const user = await this.afAuth.currentUser;
    if (user) {
      return this.afs.collection('boards').add({
        ...board,
        userId: user.uid,
        tasks: [{ description: 'New task', label: 'yellow', priority: 0 }]
      });
    } else {
      throw new Error('User not logged in');
    }
  }

  /**
   * Delete a board, and all of its tasks.
  */

  deleteBoard(boardId: string) {
    return this.afs.collection('boards').doc(boardId).delete();
  }

  /**
   * Update tasks array on a board.
  */

  updatesTasksOnABoard(boardId: string, tasks: Task[]) {
    return this.afs.collection('boards').doc(boardId).update({ tasks: tasks });
  }

  /**
   * Remove a specific task from a board.
  */
  removeTaskFromBoard(boardId: string, taskId: string) {
    return this.afs.collection('boards').doc(boardId).update({
      tasks: arrayRemove({ uid: taskId })
    });
  }
}
