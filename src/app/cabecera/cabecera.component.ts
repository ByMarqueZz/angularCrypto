import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {
  listaMonedas = [{id:''}];
  monedaElegida = '';
  @Output() nuevoDato = new EventEmitter<any>();
  constructor(private http: HttpClient) {
  }

  lanzaPeticionAjax() {
    this.http.get('https://api.coingecko.com/api/v3/coins/').subscribe(
      (json:any) => {
          this.listaMonedas = json;
          console.log(this.listaMonedas);
      }
    );
  }
  maquetarInformacion() {
    this.http.get('https://api.coingecko.com/api/v3/coins/'+this.monedaElegida).subscribe(
      (json:any) => {
        this.nuevoDato.emit(json);
      }
    );
  }

}
