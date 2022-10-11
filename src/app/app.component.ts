import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Listado de personas';

  constructor( private loginService: LoginService){}

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: 'AIzaSyC9hf3A88Ue_jG4XlXRAg1xC_jAdcuVqsc',
      authDomain: 'listado-personas-feb44.firebaseapp.com',
    });
  }

  isAutenticado() {
    return this.loginService.isAutenticado();
  }

  salir() {
    this.loginService.logout();
  }
}
