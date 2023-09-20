import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { backgroundClip } from 'html2canvas/dist/types/css/property-descriptors/background-clip';

@Directive({
  selector: '[appScale]'
})
export class ScaleDirective implements OnInit{
  scale!: number;
  constructor(public elRef: ElementRef, public renderer: Renderer2) { }

  ngOnInit(): void {
    this.scale = this.setScaleForCards();

    let classCard = this.getClass('card');
    let classHalf = this.getClass('half');
    let classColor = this.getClass('color');
    let classImage = this.getClass('image');

    this.renderer.setStyle(classCard, 'width', 59*this.scale+'mm')
    this.renderer.setStyle(classCard, 'height', 45.5*this.scale+'mm')
    this.renderer.setStyle(classCard, 'border', 1*this.scale+'px solid')
    this.renderer.setStyle(classCard, 'border-bottom', '0px')
    this.renderer.setStyle(classCard, 'border-top-left-radius', 6*this.scale+'mm')
    this.renderer.setStyle(classCard, 'border-top-right-radius', 6*this.scale+'mm')
    this.renderer.setStyle(classHalf, 'width', 53*this.scale+'mm')
    this.renderer.setStyle(classHalf, 'height', 42.5*this.scale+'mm')
    this.renderer.setStyle(classHalf, 'border-top-left-radius', 3*this.scale+'mm')
    this.renderer.setStyle(classHalf, 'border-top-right-radius', 3*this.scale+'mm')
    this.renderer.setStyle(classColor, 'width', 12*this.scale+'mm')
    this.renderer.setStyle(classColor, 'height', 12*this.scale+'mm')
    this.renderer.setStyle(classColor, 'border-radius', 6*this.scale+'mm')
    this.renderer.setStyle(classImage, 'left', 10)
  }

  setScaleForCards() {
    let width = document.body.clientWidth*0.2*0.2645/59;
    if (width > 0.7) width = 0.7;
    return width;
  }

  getClass(classs: string) {
    return this.elRef.nativeElement.getElementsByClassName(classs)[0];
  }

}
