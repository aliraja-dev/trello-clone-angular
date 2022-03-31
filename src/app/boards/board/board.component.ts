import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Board } from 'src/app/interfaces/interfaces';

import { TaskDialogComponent } from 'src/app/dialogs/task-dialog.component';

import { BoardService } from '../board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() board: Board = { uid: '', title: '', tasks: [] };
  constructor(private dialog: MatDialog, private bs: BoardService) { }

  taskDropped(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.board.tasks, event.previousIndex, event.currentIndex);
    this.bs.updatesTasksOnABoard(this.board.uid!, this.board.tasks).then(_ => console.log("success updated")).catch(e => console.log(e));
  }
  /*
   * opens a dialog to edit/ create new task in the board using dialog component
  */
  //TODO remove the any type from here and in the dialog component
  openDialog(task?: any, index?: number): void {
    const newTask = { label: 'purple' };
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task
        ? { task: { ...task }, isNew: false, boardId: this.board.uid, index }
        : { task: newTask, isNew: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isNew) {
          this.bs.updatesTasksOnABoard(this.board.uid!, [
            ...this.board.tasks,
            result.task
          ]);
        }
        else {
          const update = this.board.tasks;
          if (update) {
            update.splice(result.idx, 1, result.task);
            this.bs.updatesTasksOnABoard(this.board.uid!, update);
          }
        }
      }
    });

  }

  handleDelete() {
    console.log('delete');
    this.bs.deleteBoard(this.board.uid!);
  }
}
