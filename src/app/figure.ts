import { Card } from "./card";

export class Figure {
  piros: Card = new Card('empty', 'empty');
  tok: Card = new Card('empty', 'empty');
  zold: Card = new Card('empty', 'empty');
  makk: Card = new Card('empty', 'empty');
  back: Card = new Card('empty', 'empty');
  plus: Card = new Card('empty', 'empty');

  constructor(public label: string) {

  }
}
