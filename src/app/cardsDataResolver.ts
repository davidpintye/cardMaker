import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import { CardDeck } from './card-deck';
import { CardsService } from './services/cards.service';

@Injectable({
  providedIn: 'root'
})
export class CardDataResolver implements Resolve<any> {

  constructor(private cardsService: CardsService, private authService: AuthService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    if (this.authService.isAuthenticated()) {
      return this.cardsService.fetchCards().pipe(
        map(cards => {
          if (cards) {
            return cards.payload.val();
          }
        })
      );
    } else if (localStorage.getItem('cards')) {
      const cards$: Observable<any> = new Observable(observer => {
        const cards = JSON.parse(localStorage.getItem('cards') as string);
        if (cards) {
          observer.next(cards);
        }
        observer.complete();
      });
      return cards$;
    } else {
      const cards$: Observable<any> = new Observable(observer => {
        const cards = this.cardsService.cards;
        if (cards) {
          observer.next(cards);
        }
        observer.complete();
      });
      return cards$;
    }
  }
}
