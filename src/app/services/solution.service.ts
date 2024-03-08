import { Injectable, OnDestroy } from '@angular/core';
import { LevelService } from './level.service';
import { Subscription, map, mergeMap, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolutionService implements OnDestroy {
  subscriptions = new Subscription();

  constructor(private levelService: LevelService) { }

  // figure out what to put here so it works
  private get solution$() {
    return this.levelService.currentLevelData$.pipe(map(ld => ld.solution));
  }

  get solutionChecker() {
    return {
      next: (val:any) => {
        // val is the subscription value coming in from the code that just ran
        console.log('val is', val)
        this.subscriptions.add(this.solution$.pipe(
          take(1),
          map(expected => val === expected),
        ).subscribe(completed => this.levelService.completeCurrentLevel(completed)));
      }
    }
  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

}
