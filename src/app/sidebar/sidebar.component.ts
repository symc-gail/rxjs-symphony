import { Component, EventEmitter, Output } from '@angular/core';
import { LevelCounterComponent } from '../level-counter/level-counter.component';
import { InstructionsComponent } from '../instructions/instructions.component';
import { EditorComponent } from '../editor/editor.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [LevelCounterComponent, InstructionsComponent, EditorComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() codeChanged = new EventEmitter<string>();

}
