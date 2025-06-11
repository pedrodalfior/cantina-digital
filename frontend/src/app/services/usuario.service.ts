import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: number;
  nome: string;
  sobrenome: string;
  email: string;
  senha?: string;
  saldo: number;
  tipoUsuario: 'ADMIN' | 'USUARIO';
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  obterPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  criar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  atualizar(id: number, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, usuario);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  atualizarSaldo(id: number, novoSaldo: number): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/${id}/saldo`, { saldo: novoSaldo });
  }

  buscarPorNome(nome: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}/buscar?nome=${nome}`);
  }
} 