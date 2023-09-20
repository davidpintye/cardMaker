import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../card';
import { SubjectsForEditorService } from '../services/subjectsForEditor.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
  providers: [SubjectsForEditorService]
})
export class CardsComponent implements OnInit {
  @Input() cardsFiguresColor!: Card;
  card!: Card;
  isLoaded = false;

  constructor() { };

  ngOnInit() {
    this.isLoaded = false;
    this.card = {...this.cardsFiguresColor}
    this.isLoaded = true;
  }
}
