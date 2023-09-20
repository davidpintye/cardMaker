import { Component, OnInit } from '@angular/core';
import { ImgData } from './img-data';
import { CardsService } from './services/cards.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private db: CardsService) { }

  ngOnInit() {
  }
}

