import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Subscription } from 'rxjs';
import { Board } from 'src/app/interfaces/interfaces';
import { BoardService } from '../board.service';



@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  boards: Board[] = [];
  constructor(private bs: BoardService) { }

  ngOnInit(): void {
    this.sub = this.bs.getUserBoards().subscribe(boards => {
      this.boards = boards;
      console.log(this.boards)
    });
  }

  drop(event: Event) {

  }




  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
