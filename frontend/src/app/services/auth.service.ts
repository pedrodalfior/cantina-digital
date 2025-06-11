import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

interface AuthResponse {
  token: string;
  usuario: {
    id: number;
    nome: string;
    email: string;
    tipoUsuario: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private tokenKey = 'auth_token';
  private userKey = 'user_data';
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this._isLoggedIn.next(!!this.getToken());
  }

  login(email: string, senha: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, senha }).pipe(
      tap(response => {
        localStorage.setItem(this.tokenKey, response.token);
        localStorage.setItem(this.userKey, JSON.stringify(response.usuario));
        this._isLoggedIn.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this._isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserData(): any {
    const userData = localStorage.getItem(this.userKey);
    return userData ? JSON.parse(userData) : null;
  }

  isLoggedIn(): boolean {
    return this._isLoggedIn.value;
  }

  isAdmin(): boolean {
    const userData = this.getUserData();
    return userData?.tipoUsuario === 'ADMIN';
  }

  register(userData: {
    nome: string;
    sobrenome: string;
    email: string;
    senha: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
} 