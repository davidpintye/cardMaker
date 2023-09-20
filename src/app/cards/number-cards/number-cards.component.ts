import { CdkDragEnd, CdkDragMove } from '@angular/cdk/drag-drop';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Card } from 'src/app/card';
import { Figure } from 'src/app/figure';
import { ImgData } from 'src/app/img-data';
import { SubjectsForEditorService } from 'src/app/services/subjectsForEditor.service';

interface StyleData {
  name: string;
  value: string;
}

@Component({
  selector: 'app-number-cards',
  templateUrl: './number-cards.component.html',
  styleUrls: ['./number-cards.component.css']
})
export class NumberCardsComponent implements OnInit, AfterViewInit {
  @Input() cardIn!: Card;
  @Input() scale: number = 1;
  @Input() isTop!: boolean;
  @ViewChild('left') colorContainerL!: ElementRef;
  @ViewChild('right') colorContainerR!: ElementRef;
  @ViewChild('half') half!: ElementRef;
  @ViewChild('image') imageEl!: ElementRef;

  isInEditMode = false;
  colorsL!: number[];
  colorsR!: number[];
  styles!: any;
  number!: string;
  card!: Card;

  private mouseMoveListener: (() => void) | undefined;
  private isDragging = false;
  private startX = 0;
  private startY = 0;

  constructor(
    private elementRef: ElementRef,
    private cd: ChangeDetectorRef,
    private subjectsForEditor: SubjectsForEditorService,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.card = this.cardIn;
    this.subjectsForEditor.editModeSubject.subscribe((isInEditMode: boolean | any) => {
      this.isInEditMode = isInEditMode;
    });
  }

  ngAfterViewInit(): void {
    this.setStyles();
    this.setCards();
    this.cd.detectChanges();
  }

  scaleArr(arr: number[]) {
    let newArr: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      const element = arr[i] * this.scale;
      newArr.push(element);
    }
    return newArr;
  }

  setCards() {
    switch (this.card.figure) {
      case 'vii':
        this.colorsL = this.scaleArr([12, 6, 0]);
        this.colorsR = this.scaleArr([18, 12, 6, 0]);
        this.colorContainerL.nativeElement.classList.add('het-left');
        this.colorContainerR.nativeElement.classList.add('het-right');
        break;

      case 'viii':
        this.colorsL = this.scaleArr([18, 12, 6, 0]);
        this.colorsR = this.scaleArr([18, 12, 6, 0]);
        this.colorContainerL.nativeElement.classList.add('nyolc');
        this.colorContainerR.nativeElement.classList.add('nyolc');
        break;


      case 'ix':
        this.colorsL = this.scaleArr([18, 12, 6, 0]);
        this.colorsR = this.scaleArr([24, 18, 12, 6, 0]);
        this.colorContainerL.nativeElement.classList.add('kilenc-left');
        this.colorContainerR.nativeElement.classList.add('kilenc-right');
        break;

      case 'x':
        this.colorContainerL.nativeElement.classList.add('tiz');
        this.colorContainerR.nativeElement.classList.add('tiz');
        this.colorsL = this.scaleArr([24, 18, 12, 6, 0]);
        this.colorsR = this.scaleArr([24, 18, 12, 6, 0]);
        break;

      default:
        break;
    }
  }

  setStyles() {
    this.styles = [
      { name: 'card-width', value: `${this.scale * 59}mm` },
      { name: 'card-height', value: `${this.scale * 45.5}mm` },
      { name: 'card-border-radius', value: `${this.scale * 6}mm` },
      { name: 'half-width', value: `${this.scale * 53}mm` },
      { name: 'half-height', value: `${this.scale * 42.5}mm` },
      { name: 'half-border-radius', value: `${this.scale * 3}mm` },
      { name: 'color-width', value: `${this.scale * 12}mm` },
      { name: 'color-height', value: `${this.scale * 12}mm` },
      { name: 'color-border-radius', value: `${this.scale * 6}mm` },
      { name: 'color-container-width', value: `${this.scale * 12}mm` },
      { name: 'color-container-border-radius', value: `${this.scale * 6}mm` },
      { name: 'het-left-top', value: `${this.scale * 8}mm` },
      { name: 'het-left-height', value: `${this.scale * 24}mm` },
      { name: 'het-right-top', value: `${this.scale * 2}mm` },
      { name: 'het-right-height', value: `${this.scale * 30}mm` },
      { name: 'nyolc-top', value: `${this.scale * 8}mm` },
      { name: 'nyolc-height', value: `${this.scale * 30}mm` },
      { name: 'kilenc-left-top', value: `${this.scale * 8}mm` },
      { name: 'kilenc-left-height', value: `${this.scale * 30}mm` },
      { name: 'kilenc-right-top', value: `${this.scale * 2}mm` },
      { name: 'kilenc-right-height', value: `${this.scale * 36}mm` },
      { name: 'tiz-top', value: `${this.scale * 8}mm` },
      { name: 'tiz-height', value: `${this.scale * 36}mm` },
    ];

    this.styles.forEach((data: any) => {
      this.elementRef.nativeElement.style.setProperty(`--${data.name}`, data.value);
    });
  }

  private startDragging(clientX: number, clientY: number) {
    this.isDragging = true;
    this.startX = clientX - this.imageEl.nativeElement.offsetLeft;
    this.startY = clientY - this.imageEl.nativeElement.offsetTop;
    this.renderer.addClass(this.imageEl.nativeElement, 'dragging');
  }

  stopDragging() {
    this.isDragging = false;
    if (this.mouseMoveListener) {
      this.mouseMoveListener(); // Remove the event listener when the component is destroyed
    }
    this.renderer.removeClass(this.imageEl.nativeElement, 'dragging');
  }

  activateMoveListener(moveType: string) {
    this.mouseMoveListener = this.renderer.listen(window, moveType, (event) => {
      console.log('touchstart');
      if (this.isDragging) {
        if (moveType === 'touchmove') event = event.touches[0];
        const left = event.clientX - this.startX;
        const top = event.clientY - this.startY;
        this.card.left = left;
        this.card.top = top;
      }
    });
  }

  onWheel(event: WheelEvent) {
    if (this.isInEditMode) {
      if (event.deltaY < 0) {
        this.card.width++;
      } else if (event.deltaY > 0) {
        this.card.width--;
      }
      event.preventDefault();
      this.subjectsForEditor.sliderSubject.next('init');
    }
  }

  onMouseDown(event: MouseEvent) {
    console.log(this.isInEditMode);

    if (this.isInEditMode) {
      event.preventDefault();
      this.startDragging(event.clientX, event.clientY);
      this.activateMoveListener('mousemove');
    }
  }

  onTouchStart(event: TouchEvent) {
    if (this.isInEditMode) {
      event.preventDefault();
      const touch = event.touches[0];
      this.startDragging(touch.clientX, touch.clientY);
      this.activateMoveListener('touchmove');
    }
  }

  onMouseUp() {
    this.stopDragging();
  }

  onTouchEnd() {
    this.stopDragging();
  }

  setCardSize() {
    this.styles.forEach((data: any) => {
      this.elementRef.nativeElement.style.setProperty(`--${data.name}`, data.value);
    });
  }
}
