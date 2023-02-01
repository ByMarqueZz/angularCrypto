import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore, collectionData, collection, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  arrayBuscar$: Observable<any>;
  constructor(firestore: Firestore,private http: HttpClient) {
    const collectionBD = collection(firestore, 'items');
    this.arrayBuscar$ = collectionData(query(collectionBD, where("nombre", "==", "marquez")));
  }
  ngOnInit() {
    this.TrataInformacionCryptos();
  }
  arrayPalabrasBuscar = new Array<any>();
  crypto = new Array<any>();

  TrataInformacionCryptos() {
    // pinta las cryptos que sigues en favoritos
    this.crypto = [];
    this.arrayBuscar$.forEach((element:any) => {
      console.log(element)
      for (let i = 0; i < element.length; i++) {
      this.http.get('https://api.coingecko.com/api/v3/coins/'+element[i].moneda).subscribe(
      (json:any) => {
      this.crypto.push(json);
      });
    }
    });
  }
}
