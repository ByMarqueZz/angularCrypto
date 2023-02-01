import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore, collectionData, collection, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { addDoc } from 'firebase/firestore';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./cuerpo.component.css']
})
export class CuerpoComponent {
  arrayBuscar: Observable<any>;
  constructor(firestore: Firestore,private http: HttpClient) {
    const collectionBD = collection(firestore, 'items');
    this.arrayBuscar = collectionData(query(collectionBD, where("nombre", "==", "pepe")));
    this.nuevoDato.emit(this.arrayBuscar);
  }
  @Input() crypto = new Array<any>();

  @Output() borrar = new EventEmitter<any>();
  borrarDiv(palabra:any) {
    this.borrar.emit(palabra);
  }
  listaMonedas = new Array<any>();
  arrayFiltrado = new Array<any>();
  palabra_filtrar = '';
  @Output() nuevoDato = new EventEmitter<any>();

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
    this.palabra_filtrar = '';
    this.arrayFiltrado = [];
    this.nuevoDato.emit(this.arrayBuscar);
  }
}
