type Figure = "also" | "felso" | "kiraly" | "asz" | "vii" | "viii" | "ix" | "x" | "others" | 'empty';
type Color = "piros" | "tok" | "zold" | "makk" | "plus" | "back" | 'empty';

export class Card {
  imgSrc: string | ArrayBuffer | null = '';
  left: number = 0;
  top: number = 0;
  width: number = 100;

  constructor(public figure: Figure, public color: Color) { }

}
