import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CardDeck } from '../card-deck';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { ImgData } from '../img-data';
import { Card } from '../card';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  selectedFigure = new Subject();
  selectedColor = new Subject();
  isLoadedSubject = new Subject<boolean>();

  cards: CardDeck = {
    also: {
      label: 'Alsó',
      piros: new Card('also', 'piros'),
      tok:  new Card('also', 'tok'),
      zold:  new Card('also', 'zold'),
      makk:  new Card('also', 'makk'),
      back: new Card('empty', 'empty'),
      plus: new Card('empty', 'empty'),
    },
    felso: {
      label: 'Felső',
      piros: new Card('felso', 'piros'),
      tok:  new Card('felso', 'tok'),
      zold:  new Card('felso', 'zold'),
      makk:  new Card('felso', 'makk'),
      back: new Card('empty', 'empty'),
      plus: new Card('empty', 'empty'),
    },
    kiraly: {
      label: 'Király',
      piros: new Card('kiraly', 'piros'),
      tok:  new Card('kiraly', 'tok'),
      zold:  new Card('kiraly', 'zold'),
      makk:  new Card('kiraly', 'makk'),
      back: new Card('empty', 'empty'),
      plus: new Card('empty', 'empty'),
    },
    asz: {
      label: 'Ász',
      piros: new Card('asz', 'piros'),
      tok:  new Card('asz', 'tok'),
      zold:  new Card('asz', 'zold'),
      makk:  new Card('asz', 'makk'),
      back: new Card('empty', 'empty'),
      plus: new Card('empty', 'empty'),
    },
    vii: {
      label: 'VII',
      piros: new Card('vii', 'piros'),
      tok:  new Card('vii', 'tok'),
      zold:  new Card('vii', 'zold'),
      makk:  new Card('vii', 'makk'),
      back: new Card('empty', 'empty'),
      plus: new Card('empty', 'empty'),
    },
    viii: {
      label: 'VIII',
      piros: new Card('viii', 'piros'),
      tok:  new Card('viii', 'tok'),
      zold:  new Card('viii', 'zold'),
      makk:  new Card('viii', 'makk'),
      back: new Card('empty', 'empty'),
      plus: new Card('empty', 'empty'),
    },
    ix: {
      label: 'IX',
      piros: new Card('ix', 'piros'),
      tok:  new Card('ix', 'tok'),
      zold:  new Card('ix', 'zold'),
      makk:  new Card('ix', 'makk'),
      back: new Card('empty', 'empty'),
      plus: new Card('empty', 'empty'),
    },
    x: {
      label: 'X',
      piros: new Card('x', 'piros'),
      tok:  new Card('x', 'tok'),
      zold:  new Card('x', 'zold'),
      makk:  new Card('x', 'makk'),
      back: new Card('empty', 'empty'),
      plus: new Card('empty', 'empty'),
    },
    others: {
      label: 'Hátlap, +1',
      piros: new Card('empty', 'empty'),
      tok: new Card('empty', 'empty'),
      zold: new Card('empty', 'empty'),
      makk: new Card('empty', 'empty'),
      plus: new Card('others', 'plus'),
      back: new Card('others', 'back'),
    }
  };

  constructor(private db: AngularFireDatabase, private authService: AuthService) { }

  pathToUserCards() {
    return 'users/'+ this.authService.getUser()?.uid +'/cards/';
  }

  setCards() {
    // this.db.object('cards').set(this.cards);
    return {...this.cards};
  }

  updateCard(path: string, card: ImgData) {
    this.db.object(this.pathToUserCards() + path).update(card);
  }

  fetchCard(path: string) {
    return this.db.object(this.pathToUserCards() + path).snapshotChanges();
  }

  fetchCards() {
    return this.db.object(this.pathToUserCards()).snapshotChanges();
  }

//   fetchCard() {
//     let cards;
//     return this.db.object('cards').query.once('value').then(data => {
//       cards = data.val();
//       console.log(data);
//       return cards;
//     });
//   }
}
