import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { Board } from 'src/app/interfaces/interfaces';
import { BoardService } from '../board.service';
import { MatDialog } from '@angular/material/dialog';
import { BoardDialogComponent } from 'src/app/dialogs/board-dialog.component';


@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  boards: Board[] = [];
  constructor(private bs: BoardService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.sub = this.bs.getUserBoards().subscribe(boards => {
      this.boards = boards;
      console.log(this.boards)
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log("drop", this.boards, event.previousIndex, event.currentIndex);

    moveItemInArray(this.boards, event.previousIndex, event.currentIndex);
    this.bs.sortBoards(this.boards);
  }

  openNewBoardDialog(): void {
    console.log("open dialog for new board ");
    const dialogRef = this.dialog.open(BoardDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.bs.createBoard({
          title: result,
          priority: this.boards.length,
          tasks: [],
        });
      }
    });
  }



  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
