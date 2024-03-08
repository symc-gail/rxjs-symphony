import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { LevelStatus } from '../interfaces/level';
import { levelData } from '../data/level-data';


@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private levels: LevelStatus[] = [{
    completed: false,
    code: '',
  }, {
    completed: false,
    code: ''
  }, {
    completed: false,
    code: ''
  }, {
    completed: false,
    code: ''
  }]

  private currentLevel$ = new BehaviorSubject(0);

  get level$() {
    return this.currentLevel$.asObservable();
  }

  get currentLevelData$() {
    return this.level$.pipe(
      map(level => levelData[level])
    );
  }

  get levelsForDisplay$() {
    return this.level$.pipe(
      map((current: number) => this.levels.map((level, num) => ({
        completed: level.completed,
        current: num === current,
        goTo: num,
        name: num + 1
      })))
    )
  }

  get totalLevels() {
    return this.levels.length;
  }

  constructor() { }

  setLevel(level:number) {
    this.currentLevel$.next(level);
  }

  nextLevel() {
    let nextLevel = this.currentLevel$.value + 1;
    if(nextLevel >= this.levels.length) {
      nextLevel = this.levels.length - 1;
    }
    this.currentLevel$.next(nextLevel);
  }

  previousLevel() {
    let prevLevel = this.currentLevel$.value - 1;
    if(prevLevel < 0) {
      prevLevel = 0;
    }
    this.currentLevel$.next(prevLevel);
  }

}
