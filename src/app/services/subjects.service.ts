import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsService {
  cardUpdatedSubject = new Subject<void>();
  scaleSubject = new Subject<number>();

  constructor() { }
}
