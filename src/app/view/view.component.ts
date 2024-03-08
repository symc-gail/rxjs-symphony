import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Subscription, mergeMap, tap } from 'rxjs';
import { InstrumentComponent } from '../instrument/instrument.component';
import { InstrumentService } from '../services/instrument.service';
import { LevelService } from '../services/level.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [InstrumentComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit, OnDestroy {
  @Input() code: string = ''

  makeInstrument(name: string) {
    return {play: (sound: string) => {
      return this.instrumentService.play(name, sound);
    }}
  }

  click$ = new BehaviorSubject('click');
  currentSubscription = new Subscription();
  subscriptions = new Subscription();


  context = {
    woodwinds: this.makeInstrument('woodwinds'),
    strings: this.makeInstrument('strings'),
    brass: this.makeInstrument('brass'),
    percussion: this.makeInstrument('percussion'),
    click$: this.click$.asObservable(),
    mergeMap,
    tap
  }

  constructor(private instrumentService: InstrumentService, private levelService: LevelService) {}

  ngOnInit(): void {
    this.subscriptions.add(this.levelService.code$.subscribe(code => {
      if(code) {
        try {
          this.currentSubscription.unsubscribe();
          this.currentSubscription = new Subscription();
          console.log('code is', `with (this) { return (${code}) }` )
          this.currentSubscription.add(new Function(`with (this) { return (${code}) }`).call(this.context));
          console.log(this.currentSubscription);
        } catch {
          // just eat it
        }

      }
    }))
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
      this.currentSubscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
      if(changes['code'] && changes['code'].currentValue && typeof changes['code'].currentValue === 'string') {
        try {
          this.currentSubscription.unsubscribe();
          this.currentSubscription = new Subscription();
          console.log('code is', `with (this) { return (${changes['code'].currentValue}) }` )
          this.currentSubscription.add(new Function(`with (this) { return (${changes['code'].currentValue}) }`).call(this.context));
          console.log(this.currentSubscription);
        } catch {
          // just eat it
        }
      }
  }
}
