import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Subscription, mergeMap, tap, map } from 'rxjs';
import { InstrumentComponent } from '../instrument/instrument.component';
import { InstrumentService } from '../services/instrument.service';
import { LevelService } from '../services/level.service';
import { SolutionService } from '../services/solution.service';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [InstrumentComponent],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit, OnDestroy {
  makeInstrument(name: string) {
    return {play: (sound: string) => {
      return this.instrumentService.play(name, sound);
    }}
  }

  yay="";

  click$ = new BehaviorSubject('click');
  currentSubscription = new Subscription();
  subscriptions = new Subscription();


  context = {
    woodwinds: this.makeInstrument('woodwinds'),
    strings: this.makeInstrument('strings'),
    brass: this.makeInstrument('brass'),
    percussion: this.makeInstrument('percussion'),
    audience: this.solutionService.solutionChecker,
    click$: this.click$.asObservable(),
    mergeMap,
    tap,
    map
  }

  constructor(private instrumentService: InstrumentService, private levelService: LevelService, private solutionService: SolutionService) {}

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
    this.subscriptions.add(this.levelService.currentLevelCompleted$.pipe(
      map(completed => this.yay = completed ? "YAY!" : ""),
    ).subscribe())
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
      this.currentSubscription.unsubscribe();
  }

}
