import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, onAuthStateChanged  } from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoged = false;
  usuario: any;
  constructor(private auth:Auth) { }
  iniciarSesionEmail(email: any, password: any) {
    if (email == '' || password == '') {
      return;
    }
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        window.location.href = '/portfolio';
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  comprobarSiEstaLogeado() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user;
        this.usuario = user;
        this.isLoged = true;
      } else {
        // User is signed out
        // ...
        this.isLoged = false;
      }
      return this.isLoged;
    });
  }
  cerrarSesion() {
    this.auth.signOut();
  }

  
}
