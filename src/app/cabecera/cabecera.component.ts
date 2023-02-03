import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent {
  sesion = false;
  emailUsuario = '';
  fotoUsuario = '';
  constructor(private auth:AuthService) {
    this.auth.comprobarSiEstaLogeado().then((res:any) => {
      if (res == true) {
        this.addUserHeader();
        this.sesion = true;
      } else {
        this.sesion = false;
      }
    });
  }

  addUserHeader() {
    this.auth.devolverUsuario().then((user:any) => {
      if (user != null) {
        this.emailUsuario = user.email;
        if(user.photoURL != null) {
          this.fotoUsuario = user.photoURL;
        } else {
          this.fotoUsuario = 'https://aaahockey.org/wp-content/uploads/2017/06/default-avatar.png';
        }
      }
    });
  }
  
}
