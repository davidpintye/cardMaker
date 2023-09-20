import { AfterContentInit, ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import html2canvas from 'html2canvas';
import jspdf, { ImageOptions, RGBAData } from 'jspdf';
import { AuthService } from '../auth/auth.service';
import { Card } from '../card';
import { CardDeck } from '../card-deck';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-card-printer',
  templateUrl: './card-printer.component.html',
  styleUrls: ['./card-printer.component.css']
})
export class CardPrinterComponent implements OnInit, AfterContentInit {
  title = 'cardPrinter';
  Object = Object;
  cards!: CardDeck;
  cardsArray: any = [];
  isLoaded = false;
  backCards!: Card[];
  @ViewChildren('cardDiv') cardsElements!: QueryList<ElementRef>;
  @ViewChildren('sheet') sheetsElements!: QueryList<ElementRef>;
  cardsElArray: HTMLElement[] = [];
  sheetsElArray: HTMLElement[] = [];
  pbValue = [0,0,0,0]
  emptyCard = new Card('empty', 'empty');

  constructor(public cardsService: CardsService, private auth: AuthService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.fetchCards(this.auth.isAuthenticated());
    this.backCards = [this.cards.others.back, this.cards.others.back, this.cards.others.back, this.cards.others.back, this.cards.others.back];
  }

  ngAfterContentInit(): void {
    setTimeout(() => {
      this.sheetsElements.forEach((sheet) => this.sheetsElArray.push(sheet.nativeElement));
      this.cardsElements.forEach((card) => {
        if (!(card.nativeElement.parentElement?.parentElement?.className == 'sheet')) {
          card.nativeElement.style.display = 'none';
          this.cardsElArray.push(card.nativeElement)}
        }
      );
    });
  }

  async downloadA4(elements: HTMLElement[], index: number) {
    this.pbValue[index] = this.pbValue[index]+2;
    this.fromHtmlToPng(elements, index).then((data) => {
      this.fromPngToPdf(data, { orientation: 'l', format: 'a4', w: 297, h: 210 });
    });
  }

  async downloadCards(elements: HTMLElement[], index: number) {
    this.pbValue[index] = this.pbValue[index]+1;
    let imagArray: any = await this.fromHtmlToPng(elements, index);
    this.fromPngToPdf(imagArray, { orientation: 'p', format: [59, 91], w: 59, h: 91 });
  }

  fetchCards(authState: boolean) {
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

  async fromHtmlToPng(elements: HTMLElement[], index: number) {
    let imageArray: any = [];
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      element.style.display = 'block';
      await html2canvas(element, {
        scale: 4, onclone: (clone) => {
          clone.querySelectorAll('selector_to_hide').forEach((el: HTMLElement | any) => {
            el.style.display = 'none';
          });
        }
      }
      ).then((canvas) => {
        imageArray.push(canvas);
      })
      .then(() => {
        element.style.display = 'none';
      })
      console.log(i, elements.length);

      this.pbValue[index] = (i+1)/elements.length*100;
    }
    this.pbValue[index] = 0;
    return imageArray;
  }

  async fromPngToPdf(images: any, data: { orientation: 'l' | 'p', format: any, w: number, h: number }) {
    let pdf = new jspdf(data.orientation, 'mm', data.format, true);
    for (let i = 0; i < images.length; i++) {
      pdf.addImage(images[i], '', 0, 0, data.w, data.h, undefined, 'FAST');
      if (i < images.length - 1) pdf.addPage(data.format, data.orientation);
    }
    pdf.save('cards.pdf');
  }
}
