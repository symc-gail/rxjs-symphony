import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LevelService } from '../services/level.service';
import { CommonModule } from '@angular/common';
import { ClickService } from '../services/click.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-level-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './level-counter.component.html',
  styleUrl: './level-counter.component.scss'
})
export class LevelCounterComponent implements OnInit, OnDestroy {
  private visible = false;
  @ViewChild('dialog') dialog?: ElementRef<any>;
  @ViewChild('levelsWrapper') levelsWrapper?: ElementRef<any>;
  @ViewChild('levelIndicator') levelIndicator?: ElementRef<any>;
  subscriptions = new Subscription();

  constructor(public levelService: LevelService, private clickService: ClickService) {}
  ngOnInit(): void {
    this.subscriptions.add(this.clickService.clicked$.subscribe(target => {
      if (!this.dialog?.nativeElement.contains(target) && !this.levelsWrapper?.nativeElement.contains(target) && !this.levelIndicator?.nativeElement.contains(target)) {
        // click outside, so hide it
        this.visible = false;
      }
    }))
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


  get levelsStyle() {
    return {
      display: this.visible ? 'block' : 'none'
    }
  }

  toggleVisible(event?: Event) {
    event?.preventDefault();
    this.visible = !this.visible;
  }

  resetConfirm() {
    this.dialog?.nativeElement.showModal();
  }

  cancelReset() {
    this.dialog?.nativeElement.close();
  }

  reset() {
    this.dialog?.nativeElement.close();
    this.visible = false;
    this.levelService.reset();
  }
}
