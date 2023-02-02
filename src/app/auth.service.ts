import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, onAuthStateChanged } from "@angular/fire/auth";
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword  } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoged = false;
  usuario: any;
  constructor(private auth:Auth) { }
  iniciarSesionGoogle() {
    signInWithPopup(this.auth, new GoogleAuthProvider()).then((userCredential) => {
      const user = userCredential.user;
      window.location.href = '/portfolio';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
  registrate(email: any, password: any) {
    if (email == '' || password == '') {
      return;
    }
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        window.location.href = '/portfolio';
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  }
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
    // crea promesa para que se ejecute antes de que se ejecute el resto del código
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.isLoged = true;
          this.usuario = user;
          console.log(this.usuario);
          resolve(true);
        } else {
          this.isLoged = false;
          this.usuario = null;
          resolve(false);
        }
      });
    });
  }
  devolverUsuario() {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(this.auth, (user) => {
        if (user) {
          this.isLoged = true;
          this.usuario = user;
          resolve(user);
        } else {
          this.isLoged = false;
          this.usuario = null;
          resolve(user);
        }
      });
    });
  }
  cerrarSesion() {
    this.auth.signOut();
  }

  
}
