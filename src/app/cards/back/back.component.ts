import { Component, Input, OnInit } from '@angular/core';
import { ImgData } from 'src/app/img-data';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.css']
})
export class BackComponent {
  @Input() card!: ImgData;
}
