import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, shareReplay, map } from 'rxjs';


@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {

  //*------checks for the viewport size and changes UI based on that------------*//

  isHandset$: Observable<boolean> = this.breakpointObserver.observe('(max-width: 600px)').pipe(map(result => result.matches), shareReplay());


  constructor(private breakpointObserver: BreakpointObserver, public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

}
