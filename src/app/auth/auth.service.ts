import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user!: firebase.User | null;
  private email?: firebase.User['email'];

  constructor( private auth: AngularFireAuth ) {
    this.auth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        this.email = user.email;
      } else {
        this.user = null;
        this.email = null;
      }
    });
  }

  async signupWithEmail(email: string, password: string): Promise<any> {
    return await this.auth.createUserWithEmailAndPassword(email, password);
  }

  async loginWithEmail(email: string, password: string): Promise<void> {
    await this.auth.signInWithEmailAndPassword(email, password);
  }

  async loginWithGoogle(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    await this.auth.signInWithPopup(provider);
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
  }

  isAuthenticated$(): Observable<boolean> {
    return this.auth.authState.pipe(
      map(user => !!user)
    );
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }

  getToken(): Promise<string | null | undefined> {
    return this.auth.currentUser.then(result => {
      return result?.getIdToken() ?? Promise.resolve(null);
    });
  }

  getUser(): firebase.User | null {
    return this.user;
  }
}
