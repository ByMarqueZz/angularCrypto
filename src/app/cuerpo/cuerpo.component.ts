import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Firestore } from '@angular/fire/firestore';
import { setDoc, deleteDoc, doc } from 'firebase/firestore';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./cuerpo.component.css']
})
export class CuerpoComponent {
  firebase: any;
  emailUsuario = '';
  constructor(firestore: Firestore,private http: HttpClient, private auth:AuthService, private router:Router) {
    this.firebase = firestore;
    this.auth.devolverUsuario().then((user:any) => {
      if (user != null) {
        this.emailUsuario = user.email;
      }
    });
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
  verDetalle(id:any) {
    this.router.navigate(['/detalle/' + id]);
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
    if (moneda == 'cerrarLista') {
      this.palabra_filtrar = '';
      this.arrayFiltrado = [];
      return;
    }
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
      nombre: this.emailUsuario
    });
    this.palabra_filtrar = '';
    this.arrayFiltrado = [];
  }
  async borrarDiv(id:any){
    await deleteDoc(doc(this.firebase, "items", id));
  }
}
