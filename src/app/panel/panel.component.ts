import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Card } from '../card';
import { CardDeck } from '../card-deck';
import { CardsService } from '../services/cards.service';
import { SubjectsForEditorService } from '../services/subjectsForEditor.service';
import { SubjectsService } from '../services/subjects.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  @Input() card!: Card;
  @Input() originalCard!: Card;
  isInEditMode = false;
  sliderMin = 1;
  sliderMax = 200;
  imageFile!: File;

  constructor(
    private cardService: CardsService,
    public subjectsForEditor: SubjectsForEditorService,
    public subjectsService: SubjectsService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initSlider();
    this.subjectsForEditor.sliderSubject.subscribe(() => this.initSlider());
  }

  onUpload(event: any) {
    const files = event.target.files;
    if (files.length === 0) return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) return;

    this.imageFile = files[0];
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => this.card.imgSrc = reader.result;
    this.isInEditMode = true;
    this.subjectsForEditor.editModeSubject.next(true);
  }

  onEdit() {
    this.isInEditMode = true;
    this.subjectsForEditor.editModeSubject.next(true);
  }

  onSave() {
    if (this.authService.isAuthenticated()) {
      this.cardService.updateCard(this.card.figure + '/' + this.card.color, this.card);
    } else {
      this.saveCardToSession();
    }
    // this.originalCard = { ...this.card };
    this.isInEditMode = false;
    this.subjectsForEditor.editModeSubject.next(false);
    this.subjectsService.cardUpdatedSubject.next();
  };

  onCancel() {
    this.card.imgSrc = this.originalCard.imgSrc;
    this.card.width = this.originalCard.width;
    this.card.top = this.originalCard.top;
    this.card.left = this.originalCard.left;
    this.isInEditMode = false;
    this.subjectsForEditor.editModeSubject.next(false);
  }

  onDelete() {
    if (this.authService.isAuthenticated()) {
      this.resetCard(this.card);
      this.cardService.updateCard(this.card.figure + '/' + this.card.color, this.card);
    } else if (localStorage.getItem('cards')) {
      let cards = JSON.parse(localStorage.getItem('cards')!);
      let card = cards[this.card.figure as keyof CardDeck][this.card.color];
      this.resetCard(card);
      this.resetCard(this.card);
      localStorage.setItem('cards', JSON.stringify(cards));
    } else {
      this.resetCard(this.card);
    }
    this.subjectsService.cardUpdatedSubject.next();
  }

  saveCardToSession() {
    const figureStr = this.card.figure as string;
    const colorStr = this.card.color as string;
    if (localStorage.getItem('cards')) {
      let cards = JSON.parse(localStorage.getItem('cards')!);
      cards[figureStr as keyof CardDeck][colorStr] = this.card;
      localStorage.setItem('cards', JSON.stringify(cards));
    }
  }

  resetCard(card: Card) {
    card.width = 100;
    card.top = 0;
    card.left = 0;
    card.imgSrc = '';
  }

  sliderMouseUp() {
    this.initSlider();
  }

  initSlider() {
    this.sliderMin = this.card.width - 99;
    this.sliderMax = this.card.width + 100;
  }
}
