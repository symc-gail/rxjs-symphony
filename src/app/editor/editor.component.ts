import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef, ContentChild, EventEmitter, OnInit, Output, AfterContentInit} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.scss'
})
export class EditorComponent implements OnInit, AfterContentInit {
  @ContentChild('before') beforeTpl: TemplateRef<any> | null = null;
  @ContentChild('after') afterTpl: TemplateRef<any> | null = null;
  @Input() before?: string;
  @Input() after?: string;
  @Input() lines: number = 1;
  @Output() change = new EventEmitter<string>();

  code = new FormControl('');

  get textareaStyle() {
    return {
      height: `${this.lines * 24}px`
    }
  }

  ngOnInit(): void {
    this.code.valueChanges.subscribe(_ => this.change.emit(`${this.before}${_}${this.after}`))
  }

  ngAfterContentInit() {

  }
}
