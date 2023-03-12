import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type PageConfig = {
  [key: string]: {
    title: string;
    progress: string;
  };
}

const PAGE_CONFIG: PageConfig = {
  '/general-info': {
    title: 'პირადი ინფო',
    progress: '1/3'
  },
  '/education': {
    title: 'განათლება',
    progress: '3/3'
  },
  '/work-experience': {
    title: 'გამოცდილება',
    progress: '2/3'
  }
};

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private pageTitleSource = new BehaviorSubject<string>('');
  private pageProgressSource = new BehaviorSubject<string>('');

  pageTitle = this.pageTitleSource.asObservable();
  pageProgress = this.pageProgressSource.asObservable();

  constructor() { }

  setPage(url: string) {
    const pageConfig = PAGE_CONFIG[url];

    if (pageConfig) {
      this.pageTitleSource.next(pageConfig.title);
      this.pageProgressSource.next(pageConfig.progress);
    }

  }
}
