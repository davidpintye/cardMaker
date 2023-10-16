import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Card } from '../card';
import { CardDeck } from '../card-deck';
import { CardsService } from '../services/cards.service';
import { SubjectsService } from '../services/subjects.service';

@Component({
  selector: 'app-card-editor',
  templateUrl: './card-editor.component.html',
  styleUrls: ['./card-editor.component.css']
})
export class CardEditorComponent implements OnInit, AfterViewInit {
  title = 'cardMaker';
  Object = Object;
  cards!: CardDeck;
  colorArr = ['../../assets/piros.png', '../../assets/tok.png', '../../assets/zold.png', '../../assets/makk.png'];
  figureIndex = 0;
  colorIndex = 0;
  sliderMin = 1;
  sliderMax = 200;
  isLoaded = false;
  figureArr = [
    'also' as keyof CardDeck,
    'felso' as keyof CardDeck,
    'kiraly' as keyof CardDeck,
    'asz' as keyof CardDeck,
    'vii' as keyof CardDeck,
    'viii' as keyof CardDeck,
    'ix' as keyof CardDeck,
    'x' as keyof CardDeck,
    'others' as keyof CardDeck
  ];
  othersArray!: Card[];

  constructor(
    private cardsService: CardsService,
    private authService: AuthService,
    private subjectsService: SubjectsService
  ) { }

  ngOnInit(): void {
    this.authService.isAuthenticated$().subscribe((authState: boolean) => {
      this.fetchCards(authState);
    })

    this.cardsService.selectedFigure.subscribe((data: any) => {
      console.log(data);
      
      this.figureIndex = NaN;
      this.colorIndex = NaN;
      switch (data.label) {
        case 'Alsó':
          this.figureIndex = 0;
          break;

        case 'Felső':
          this.figureIndex = 1;
          break;

        case 'Király':
          this.figureIndex = 2;
          break;

        case 'Ász':
          this.figureIndex = 3;
          break;

        case 'VII':
          this.figureIndex = 4;
          break;

        case 'VIII':
          this.figureIndex = 5;
          break;

        case 'IX':
          this.figureIndex = 6;
          break;

        case 'X':
          this.figureIndex = 7;
          break;

        case 'Hátlap, +1':
          this.figureIndex = 8;
          break;

        default:
          break;
      }

      this.colorIndex = data.colorIndex;
      
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  ngAfterViewInit(): void {
    this.subjectsService.cardUpdatedSubject.subscribe(() => this.fetchCards(this.authService.isAuthenticated()));
  }

  fetchCards(authState: boolean) {
    this.isLoaded = false;

    if (authState) {
      this.cardsService.fetchCards().subscribe((cards: CardDeck | any) => {
        this.cards = cards.payload.val();
      })
    } else if (localStorage.getItem('cards')) {
      this.cards = JSON.parse(localStorage.getItem('cards') as string);
    } else {
      this.cards = this.cardsService.cards;
      localStorage.setItem('cards', JSON.stringify(this.cards));
    }
    this.isLoaded = true;
  }
}
