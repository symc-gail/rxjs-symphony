import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClickService {
  private documentClickedTarget: Subject<HTMLElement | null> = new BehaviorSubject<HTMLElement | null>(null);

  constructor() { }

  get clicked$() {
    return this.documentClickedTarget.asObservable();
  }

  documentClicked(event: MouseEvent) {
    // is this type ever wrong?
    this.documentClickedTarget.next(event.target as HTMLElement);
  }
}
