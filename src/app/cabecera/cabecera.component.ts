import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {

  listaMonedas = new Array<any>();
  arrayFiltrado = new Array<any>();
  arrayBuscar = new Array<any>();
  palabra_filtrar = '';
  @Output() nuevoDato = new EventEmitter<any>();

  constructor(private http: HttpClient) {
  }
  ngOnInit() {
    this.lanzaPeticionAjax();
  }
  lanzaPeticionAjax() {
    // obtiene la lista de monedas
    this.http.get('https://api.coingecko.com/api/v3/coins/').subscribe(
      (json:any) => {
          this.listaMonedas = json;
      }
    );
  }
  filtrarPorNombre() {
    this.arrayFiltrado = this.listaMonedas.filter((moneda) => moneda.name.toLowerCase().includes(this.palabra_filtrar.toLowerCase()));
  }
  anadirParaBuscar(moneda:any) {
    if (this.arrayBuscar.indexOf(moneda) == -1) {
      this.arrayBuscar.push(moneda);
    }
    this.palabra_filtrar = '';
    this.arrayFiltrado = [];
    this.nuevoDato.emit(this.arrayBuscar);
  }
}
