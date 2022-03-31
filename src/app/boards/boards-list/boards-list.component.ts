import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Board } from 'src/app/interfaces/interfaces';
import { BoardService } from '../board.service';

@Component({
  selector: 'app-boards-list',
  templateUrl: './boards-list.component.html',
  styleUrls: ['./boards-list.component.scss']
})
export class BoardsListComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  boards: Board[] = [];;
  constructor(private bs: BoardService) { }

  ngOnInit(): void {
    this.sub = this.bs.getUserBoards().subscribe(boards => {
      this.boards = boards;
    });
  }






  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
