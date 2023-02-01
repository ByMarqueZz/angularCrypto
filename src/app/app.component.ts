import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http: HttpClient) {
  }
  arrayPalabrasBuscar = new Array<any>();
  crypto = new Array<any>();

  TrataInformacionCryptos(json:any) {
    // obtiene la lista de monedas a buscar
    // pide la información a la api y lo guarda en el array crypto
    this.arrayPalabrasBuscar = json;
    this.crypto = [];
    for(let i=0; i<this.arrayPalabrasBuscar.length; i++) {
      this.http.get('https://api.coingecko.com/api/v3/coins/'+this.arrayPalabrasBuscar[i]).subscribe(
      (json:any) => {
      this.crypto.push(json);
      });
    }
  }
  borrarPalabraBuscar(palabra:any) {
    // borra la palabra de la lista de palabras a buscar
    // y actualiza el array crypto
    this.arrayPalabrasBuscar.splice(this.arrayPalabrasBuscar.indexOf(palabra), 1);
    this.TrataInformacionCryptos(this.arrayPalabrasBuscar);
  }
}
