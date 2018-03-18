import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadedFeature = 'recipe';

  ngOnInit() {
   firebase.initializeApp({
    apiKey: "AIzaSyAtLvg0qIgwA2zu4cYB-jgREDCgRy4pqJI",
    authDomain: "angularproject20171008.firebaseapp.com"
   });
  }

  onNavigate(feature: string)  {
    this.loadedFeature = feature;
  }
}

