import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';

type InstrumentSubjects = {
  [key: string]: BehaviorSubject<string>
}

@Injectable({
  providedIn: 'root'
})
export class InstrumentService {
  private subjects: InstrumentSubjects = {
    percussion: new BehaviorSubject(''),
    woodwinds: new BehaviorSubject(''),
    strings: new BehaviorSubject(''),
    brass: new BehaviorSubject(''),
  }

  constructor() { }

  getObservable(instrument: string): Observable<string> {
    return this.subjects[instrument].asObservable();
  }

  play(instrument: string, note?: string) {
    const subj = this.subjects[instrument];
    if(subj) {
      subj.next(note ?? 'toot');
      return subj.asObservable().pipe(
        map(note => `${instrument}:${note}`)
      );
    }
    return of(null);
  }
}
