import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CvService } from 'src/app/services/cv.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  pageProgress = '';

  pageTitle: Observable<string>;

  constructor(private headerService: HeaderService, private router: Router, private cvService: CvService) {
    headerService.pageProgress.subscribe((progress) => {
      this.pageProgress = progress;
    });

    this.pageTitle = headerService.pageTitle;
  }

  ngOnInit(): void {
  }

  goToHomePage() {
    this.cvService.clearCV();
    this.router.navigate(["/"]);
  }

}
