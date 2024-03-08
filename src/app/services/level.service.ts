import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, map } from 'rxjs';
import { LevelStatus } from '../interfaces/level';
import { levelData } from '../data/level-data';
import { LocalStorageService } from './local-storage.service';


const DATA_STORAGE_KEY = "RXJS-SYMPHONY-LEVEL-DATA";
const LEVEL_STORAGE_KEY = "RXJS-SYMPHONY-CURRENT-LEVEL";

@Injectable({
  providedIn: 'root'
})
export class LevelService {
  private loaded = false;

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
  private currentCode$ = new BehaviorSubject('');
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
      this.levels = JSON.parse(storedData);
    }
    const storedLevel = this.localStorageService.get(LEVEL_STORAGE_KEY);
    if(storedLevel) {
      this.setLevel(parseInt(storedLevel));
    }
    this.loaded = true;
  }

}
