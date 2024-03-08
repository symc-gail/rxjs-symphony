import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ViewComponent } from './view/view.component';
import { LevelService } from './services/level.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, ViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'rxjs-symphony';
  code = '';

  constructor(private levelService: LevelService) {}

  ngOnInit(): void {
      this.levelService.initFromLocalStorage();
  }
}
