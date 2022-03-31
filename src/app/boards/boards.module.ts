import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BoardsRoutingModule } from './boards-routing.module';
import { BoardsListComponent } from './boards-list/boards-list.component';
import { BoardComponent } from './board/board.component';
import { SharedModule } from '../shared/shared.module';

import { TaskDialogComponent } from '../dialogs/task-dialog.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { BoardDialogComponent } from '../dialogs/board-dialog.component';

@NgModule({
  declarations: [
    BoardsListComponent,
    BoardComponent,
    TaskDialogComponent,
    BoardDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    BoardsRoutingModule,
    DragDropModule,
    MatDialogModule,
    MatButtonToggleModule
  ],
  entryComponents: [TaskDialogComponent, BoardDialogComponent]
})
export class BoardsModule { }
