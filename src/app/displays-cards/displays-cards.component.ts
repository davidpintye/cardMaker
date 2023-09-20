import { Component, ElementRef, HostListener, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CardDeck } from '../card-deck';
import { FigureCardsComponent } from '../cards/figure-cards/figure-cards.component';
import { NumberCardsComponent } from '../cards/number-cards/number-cards.component';
import { CardsService } from '../services/cards.service';
import { SubjectsService } from '../services/subjects.service';

@Component({
  selector: 'app-displays-cards',
  templateUrl: './displays-cards.component.html',
  styleUrls: ['./displays-cards.component.css']
})
export class DisplaysCardsComponent implements OnInit {
  @Input() cards!: CardDeck;
  @ViewChildren('app1, app2, app3, app4, app5, app6, app7') halfCards!: QueryList<FigureCardsComponent | NumberCardsComponent>;
  Object = Object;
  isLoaded = false;
  scale: number = 1;
  cardBorder: any;
  i: number = 0;


  constructor(public cardsService: CardsService) { }

  ngOnInit(): void {
    this.setScaleForCards();
  }

  onClick(i: number, label: string) {
    this.cardsService.selectedFigure.next({ colorIndex: i, label: label })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.setScaleForCards();
    this.halfCards.forEach((halfCard: FigureCardsComponent | NumberCardsComponent) => {
      halfCard.ngAfterViewInit();
    })
  }

  setScaleForCards() {
    let width = document.body.clientWidth * 0.18 * 0.2645 / 59;
    if (width > 0.7) width = 0.7;
    this.scale = width;
    this.cardBorder = {
      'width': 59 * this.scale + 'mm',
      'height': 91 * this.scale + 'mm',
      'border-radius': 6 * this.scale + 'mm'
    };
  }
}
