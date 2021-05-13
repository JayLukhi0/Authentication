import { animate, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations:[
    trigger('fade',[
      transition('void => *',[
        style({opacity:0}),
        animate(2000)
      ])
    ])
  ]
})
export class AppComponent {
  title = 'Authentication';

  constructor(public _authService:AuthService){ 
  }

  logOut(){
    this._authService.logout();
  }
 
}

