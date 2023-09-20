import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectsForEditorService {
  editModeSubject = new Subject();
  sliderSubject = new Subject();
  constructor() { }
}
