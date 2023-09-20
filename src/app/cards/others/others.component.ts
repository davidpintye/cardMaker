import { ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Card } from 'src/app/card';
import { SubjectsForEditorService } from 'src/app/services/subjectsForEditor.service';

interface StyleData {
  name: string;
  value: string;
}

@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.css']
})

export class OthersComponent {
  @ViewChild('image') imageEl!: ElementRef;
  @Input() scale = 1;
  @Input() cardIn!: Card;
  @Input() isInEditMode = false;
  card!: Card;

  private mouseMoveListener: (() => void) | undefined;
  private isDragging = false;
  private startX = 0;
  private startY = 0;
  isLoaded = false;


  styles!: StyleData[];

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private subjectsForEditorService: SubjectsForEditorService,
    private cd : ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.card = this.cardIn;
    this.isLoaded = true;
    this.subjectsForEditorService.editModeSubject.subscribe((isInEditMode: boolean | any) => this.isInEditMode = isInEditMode);
  }

  ngAfterViewInit(): void {
    this.styles = [
      { name: 'card-width', value: `${this.scale * 59}mm` },
      { name: 'card-height', value: `${this.scale * 45.5}mm` },
      { name: 'card-back-height', value: `${this.scale * 91}mm` },
      { name: 'card-border-radius', value: `${this.scale * 6}mm` },
      { name: 'half-width', value: `${this.scale * 53}mm` },
      { name: 'half-height', value: `${this.scale * 42.5}mm` },
      { name: 'back-height', value: `${this.scale * 85}mm` },
      { name: 'half-border-radius', value: `${this.scale * 3}mm` },
      { name: 'color-width', value: `${this.scale * 12}mm` },
      { name: 'color-height', value: `${this.scale * 12}mm` },
      { name: 'color-border-radius', value: `${this.scale * 6}mm` },
    ];
    this.setCardSize();
    this.cd.detectChanges();
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
      this.subjectsForEditorService.sliderSubject.next('init');
    }
  }

  onMouseDown(event: MouseEvent) {
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
    this.styles.forEach(data => {
      this.elementRef.nativeElement.style.setProperty(`--${data.name}`, data.value);
    });
  }
}
