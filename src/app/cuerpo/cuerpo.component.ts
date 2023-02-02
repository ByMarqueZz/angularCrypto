import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore, collectionData, collection, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { setDoc, deleteDoc, doc } from 'firebase/firestore';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./cuerpo.component.css']
})
export class CuerpoComponent {
  firebase: any;
  constructor(firestore: Firestore,private http: HttpClient) {
    this.firebase = firestore;
  }
  @Input() crypto = new Array<any>();

  @Output() borrar = new EventEmitter<any>();
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
  async anadirParaBuscar(moneda:any) {
    // comprueba si existe la moneda en el array que nos traemos de la base de datos
    // si existe no hace nada y si no existe la añade
    for(let i = 0; i < this.crypto.length; i++){
      if(this.crypto[i].id == moneda){
        this.palabra_filtrar = '';
        this.arrayFiltrado = [];
        return;
      }
    }
    await setDoc(doc(this.firebase, "items", moneda), {
      moneda: moneda,
      nombre: "marquez"
    });
    this.palabra_filtrar = '';
    this.arrayFiltrado = [];
  }
  async borrarDiv(id:any){
    await deleteDoc(doc(this.firebase, "items", id));
  }
}
