import { Component } from '@angular/core';
import { LevelService } from '../services/level.service';
import { map } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-instructions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './instructions.component.html',
  styleUrl: './instructions.component.scss'
})
export class InstructionsComponent {
  constructor(private levelService: LevelService) {}

  get instructions$() {
    return this.levelService.currentLevelData$.pipe(map(ld => ld.instructions));
  }
}
