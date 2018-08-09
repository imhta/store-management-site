import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  loading;
  windowHeight;
  constructor( private router: Router) {
   }

  ngOnInit() {
    this.windowHeight =  window.screen.height + 'px';
  }
  ngOnDestroy() {  }


}
