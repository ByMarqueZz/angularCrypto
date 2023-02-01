import { Component } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged  } from "firebase/auth";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  functionStateLogged() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
      } else {
        window.location.href = "http://localhost:4200/inicio";
      }
    });
  }
  functionSignIn(email:any, password:any) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Usuario logueado")
      const user = userCredential.user;
      // ...
    })
  }
}
