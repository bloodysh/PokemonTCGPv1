import { Component, AfterViewInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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

  constructor() {
    const app = initializeApp(environment.firebase);
    console.log('Firebase App Initialized:', app);
  }
}
