import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, ContentChild, EventEmitter, OnInit, Output, AfterContentInit, OnDestroy} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LevelService } from '../services/level.service';
import { Subscription, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit, AfterContentInit, OnDestroy {
  @ContentChild('before') beforeTpl: TemplateRef<any> | null = null;
  @ContentChild('after') afterTpl: TemplateRef<any> | null = null;
  @Output() change = new EventEmitter<string>();

  code = new FormControl('');
  subscriptions = new Subscription();

  constructor(private levelService: LevelService) {}

  get textareaStyle$() {
    return this.lines$.pipe(map((lines: number) => ({
      height: `${lines * 24}px`
    })));
  }

  get code$() {
    return this.levelService.currentLevelData$.pipe(map(ld => ld.code));
  }

  get before$() {
    return this.code$.pipe(map(c => c.before))
  }

  get lines$() {
    return this.code$.pipe(map(c => c.lines))
  }

  get after$() {
    return this.code$.pipe(map(c => c.after));
  }

  get nextDisabled$() {
    return this.levelService.currentLevelCompleted$.pipe(map(completed => !completed))
  }

  get nextClasses$() {
    return this.levelService.currentLevelCompleted$.pipe(
      map(completed => ({
        danger: true,
        'animate__animated animate__tada': completed,
        'disabled': !completed
      }))
    )
  }

  ngOnInit(): void {
    this.subscriptions.add(this.code.valueChanges.subscribe(code => this.levelService.saveCode(code ?? '')));
    this.subscriptions.add(this.levelService.savedCode$.asObservable().subscribe(savedCode => {
      this.code.setValue(savedCode);
    }))
  }

  ngAfterContentInit() {

  }

  ngOnDestroy(): void {
      this.subscriptions.unsubscribe();
  }

  nextLevel() {
    this.levelService.nextLevel();
  }
}
