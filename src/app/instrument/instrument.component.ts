import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { InstrumentService } from '../services/instrument.service';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instrument',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instrument.component.html',
  styleUrl: './instrument.component.scss'
})
export class InstrumentComponent implements OnInit, OnDestroy{
  @Input() name!: string;
  subscriptions = new Subscription();
  note$?: Observable<string>;
  @ViewChild('note') note?: ElementRef<any>;

  constructor(private instrumentService: InstrumentService) {}

  ngOnInit() {
    this.note$ = this.instrumentService.getObservable(this.name);
    this.subscriptions.add(this.note$.subscribe(_ => {
      this.note?.nativeElement.classList.remove('toot');
      void this.note?.nativeElement.offsetWidth;
      this.note?.nativeElement.classList.add('toot');
    }))
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }
}
