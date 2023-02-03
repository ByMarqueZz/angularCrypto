import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {
  emailUsuario = '';
  fotoUsuario = '';
  constructor(public auth:AuthService) {
  }
  ngOnInit() {
    this.auth.comprobarSiEstaLogeado();
    console.log(this.auth.isLoged)
    if (this.auth.isLoged!=null) {
      
      this.emailUsuario = this.auth.isLoged.email;
      if(this.auth.isLoged.photoURL != null) {
        this.fotoUsuario = this.auth.isLoged.photoURL;
      } else {
        this.fotoUsuario = 'https://aaahockey.org/wp-content/uploads/2017/06/default-avatar.png';
      }
    }
  }
  
}
