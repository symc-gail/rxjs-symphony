import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Subscription, mergeMap, tap } from 'rxjs';
import { InstrumentComponent } from '../instrument/instrument.component';
import { InstrumentService } from '../services/instrument.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [InstrumentComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnChanges {
  @Input() code: string = ''

  makeInstrument(name: string) {
    return {play: (sound: string) => {
      return this.instrumentService.play(name, sound);
    }}
  }

  click$ = new BehaviorSubject('click');
  currentSubscription = new Subscription();


  context = {
    woodwinds: this.makeInstrument('woodwinds'),
    strings: this.makeInstrument('strings'),
    brass: this.makeInstrument('brass'),
    percussion: this.makeInstrument('percussion'),
    click$: this.click$.asObservable(),
    mergeMap,
    tap
  }

  constructor(private instrumentService: InstrumentService) {}

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
