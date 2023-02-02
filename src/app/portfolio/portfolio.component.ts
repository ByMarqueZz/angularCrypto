import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore, collectionData, collection, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  arrayBuscar$: Observable<any>;
  emailUsuario = '';
  constructor(firestore: Firestore,private http: HttpClient, private auth:AuthService) {
    this.auth.devolverUsuario().then((user:any) => {
      if (user != null) {
        this.emailUsuario = user.email;
        const collectionBD = collection(firestore, 'items');
        this.arrayBuscar$ = collectionData(query(collectionBD, where("nombre", "==", this.emailUsuario)));
        this.TrataInformacionCryptos();
      }
    });
    const collectionBD = collection(firestore, 'items');
    this.arrayBuscar$ = collectionData(query(collectionBD, where("nombre", "==", this.emailUsuario)));
  }
  ngOnInit() {

    // coge la promesa de auth y comprueba si está logeado
    this.auth.comprobarSiEstaLogeado().then((res:any) => {
      if (res == false) {
        window.location.href = '/login';
      }
    });

  }
  crypto = new Array<any>();

  TrataInformacionCryptos() {
    // obtengo del observable los datos de la base de datos y los recorro para hacer la petición ajax
    // y guardar los datos en el array crypto
    this.arrayBuscar$.forEach((element:any) => {
      this.crypto = [];
      for (let i = 0; i < element.length; i++) {
      this.http.get('https://api.coingecko.com/api/v3/coins/'+element[i].moneda).subscribe(
      (json:any) => {
        if(this.crypto.find((crypto:any) => crypto.id == json.id)){
          return;
        }
        this.crypto.push(json);
      });
    }
    });
  }
}
