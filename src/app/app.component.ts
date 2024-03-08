import { Component, HostListener, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ViewComponent } from './view/view.component';
import { LevelService } from './services/level.service';
import { ClickService } from './services/click.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'rxjs-symphony';

  constructor(private levelService: LevelService, private clickService: ClickService) {}

  ngOnInit(): void {
      this.levelService.initFromLocalStorage();
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    this.clickService.documentClicked(event);
  }
}
