import { Component } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cuerpo',
  templateUrl: './cuerpo.component.html',
  styleUrls: ['./cuerpo.component.css']
})
export class CuerpoComponent {
  @Input() crypto = new Array<any>();

  @Output() borrar = new EventEmitter<any>();
  borrarDiv(palabra:any) {
    this.borrar.emit(palabra);
  }
}
