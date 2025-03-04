import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Pokemon TCGP Tracker';

  moveHighlight(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const highlight = document.getElementById('nav-highlight');
    if (highlight && target) {
      highlight.style.width = `${target.offsetWidth}px`;
      highlight.style.left = `${target.offsetLeft}px`;
    }
  }
}
