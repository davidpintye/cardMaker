import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appFigureOptions]'
})
export class FigureOptionsDirective implements OnInit{
  @Input() figureInput!: string;
  constructor(public templateRef: TemplateRef<any>, public vcRef: ViewContainerRef) { }

  ngOnInit(): void {
    console.log(this.vcRef);
      // switch (this.figureInput) {
        // case 'also':
          // break;

        // default:
          // break;
      // }
  }

}
