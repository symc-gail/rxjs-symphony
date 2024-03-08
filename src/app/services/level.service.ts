import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { LevelStatus } from '../interfaces/level';
import { levelData } from '../data/level-data';
import { LocalStorageService } from './local-storage.service';

const defaultLevels = () => levelData.map(_ => ({completed: false, code: ''}))

const DATA_STORAGE_KEY = "RXJS-SYMPHONY-LEVEL-DATA";
const LEVEL_STORAGE_KEY = "RXJS-SYMPHONY-CURRENT-LEVEL";

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private loaded = false;

  private levels: LevelStatus[] = defaultLevels();
  private currentLevel$ = new BehaviorSubject(0);
  private currentCode$ = new BehaviorSubject('');
  private checkCompleted$ = new BehaviorSubject(0);
  // this is slightly different from CurrentCode - it only fires on level switch
  savedCode$ = new BehaviorSubject('');

  get level$() {
    return this.currentLevel$.asObservable();
  }

  get code$() {
    return combineLatest([this.level$, this.currentCode$]).pipe(
      // add the "before" and "after" from the current level to the saved string
      map(([level, code]) => `${levelData[level].code.before}${code}${levelData[level].code.after}`)
    )
  }

  get currentLevelData$() {
    return this.level$.pipe(
      map(level => levelData[level])
    );
  }

  get currentLevelCompleted$() {
    return combineLatest([this.level$, this.checkCompleted$]).pipe(
      map(([level, _]) => this.levels[level].completed)
    )
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

  constructor(private localStorageService: LocalStorageService) { }

  setLevel(level:number) {
    // first make sure the current code is saved (but only if it's loaded)
    if (this.loaded) {
      this.levels[this.currentLevel$.value].code = this.currentCode$.value;
    }
    // then change the level
    this.currentLevel$.next(level);
    this.currentCode$.next(this.levels[level].code);
    this.savedCode$.next(this.levels[level].code);
    this.saveLevelToLocalStorage();
  }

  nextLevel() {
    let nextLevel = this.currentLevel$.value + 1;
    if(nextLevel >= this.levels.length) {
      nextLevel = this.levels.length - 1;
    }
    return this.setLevel(nextLevel);
  }

  previousLevel() {
    let prevLevel = this.currentLevel$.value - 1;
    if(prevLevel < 0) {
      prevLevel = 0;
    }
    return this.setLevel(prevLevel);
  }

  saveCode(code: string) {
    const level = this.currentLevel$.value
    this.levels[level].code = code;
    this.currentCode$.next(code);
    this.saveDataToLocalStorage();
  }

  private saveDataToLocalStorage() {
    if (this.loaded) {
      const dataToStore = JSON.stringify(this.levels);
      this.localStorageService.set(DATA_STORAGE_KEY, dataToStore);
    }
  }

  private saveLevelToLocalStorage() {
    if (this.loaded) {
      const levelToStore = this.currentLevel$.value.toString();
      this.localStorageService.set(LEVEL_STORAGE_KEY, levelToStore);
    }
  }

  initFromLocalStorage() {
    const storedData = this.localStorageService.get(DATA_STORAGE_KEY);
    if (storedData) {
      const levels = JSON.parse(storedData);
      // check length against the current level data, only load if it's the same
      if (levels.length === levelData.length) {
        this.levels = levels;
      }
      // if there are now more levels, replace
      else if (levels.length < levelData.length) {
        this.levels.splice(0,levels.length, ...levels)
      }
      // otherwise truncate the levels
      else {
        this.levels = levels.slice(0, levelData.length)
      }
    }
    const storedLevel = this.localStorageService.get(LEVEL_STORAGE_KEY);
    if(storedLevel) {
      // make sure it's a valid level, otherwise use the first one
      let level = parseInt(storedLevel);
      if(level >= levelData.length) {
        level = 0;
      }
      this.setLevel(level);
    }
    this.loaded = true;
  }

  reset() {
    this.loaded = false;
    this.localStorageService.clear();
    this.levels = defaultLevels();
    this.setLevel(0);
    this.loaded = true;
  }

  completeCurrentLevel(completed: boolean) {
    if(completed) {
      const currentLevel = this.currentLevel$.value
      this.levels[currentLevel].completed = completed;
      this.saveDataToLocalStorage();
      this.checkCompleted$.next(this.checkCompleted$.value + 1)
    }
  }

}
