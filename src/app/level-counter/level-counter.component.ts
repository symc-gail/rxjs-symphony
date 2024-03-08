import { Component } from '@angular/core';
import { LevelService } from '../services/level.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-level-counter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './level-counter.component.html',
  styleUrl: './level-counter.component.scss'
})
export class LevelCounterComponent {
  private visible = false;

  constructor(public levelService: LevelService) {}

  get levelsStyle() {
    return {
      display: this.visible ? 'block' : 'none'
    }
  }

  toggleVisible() {
    this.visible = !this.visible;
  }
}
