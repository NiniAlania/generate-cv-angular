import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SessionStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>;

  constructor(private firestore: AngularFirestore, private sessionStorage: SessionStorageService) {
    this.items = firestore.collection('items').valueChanges()
  }

  ngOnInit(): void {
  }

}
