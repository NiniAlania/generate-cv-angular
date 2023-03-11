import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HeaderService } from './services/header.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'generate-cv-angular';
  
  isFormPage = false;

  constructor(private router: Router, private headerService: HeaderService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        switch (event.url) {
          case '/general-info':
          case '/education':
          case '/work-experience':
            this.isFormPage = true;
            this.headerService.setPage(event.url);
            break;
          default:
            this.isFormPage = false;
            break;
        }
      }
    });
  }
}
