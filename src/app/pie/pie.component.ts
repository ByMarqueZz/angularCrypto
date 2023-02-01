import { Component } from '@angular/core';
import { Firestore, collectionData, collection, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.css']
})
export class PieComponent {
  item$: Observable<any>;
  constructor(firestore: Firestore) {
    const collectionBD = collection(firestore, 'items');
    this.item$ = collectionData(query(collectionBD, where("nombre", "==", "pepe")));
  }
}
