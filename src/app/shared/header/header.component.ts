import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  pageProgress = '';

  pageTitle: Observable<string>;

  constructor(private headerService: HeaderService) {
    headerService.pageProgress.subscribe((progress) => {
      this.pageProgress = progress;
    });

    this.pageTitle = headerService.pageTitle;
  }

  ngOnInit(): void {
  }

}
