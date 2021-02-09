import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB_QF3xIWXzU0Hbh8p1dSx8OcqTab2MoL4",
  authDomain: "fire-course-c7496.firebaseapp.com",
  databaseURL: "https://fire-course-c7496.firebaseio.com",
  projectId: "fire-course-c7496",
  storageBucket: "fire-course-c7496.appspot.com",
  messagingSenderId: "864826074044",
  appId: "1:864826074044:web:d4ae2c75e4263e6e1641b9",
  measurementId: "G-RF4Z31SEPT"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
