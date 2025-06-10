import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginDTO {
  email: string;
  senha: string;
}

export interface RegistroDTO {
  nome: string;
  sobrenome: string;
  email: string;
  senha: string;
}

export interface RespostaAutenticacaoDTO {
  token: string;
  tipoToken: string;
  email: string;
  nome: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) { }

  login(credentials: LoginDTO): Observable<RespostaAutenticacaoDTO> {
    return this.http.post<RespostaAutenticacaoDTO>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('email', response.email);
        })
      );
  }

  registrar(userData: RegistroDTO): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/registrar`, userData);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
} 