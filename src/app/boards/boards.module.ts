import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsListComponent } from './boards-list/boards-list.component';
import { BoardComponent } from './board/board.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BoardsListComponent,
    BoardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    BoardsRoutingModule
  ]
})
export class BoardsModule { }
