import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Alimento {
  id?: number;
  nome: string;
  urlImagem: string;
  valor: number;
  disponivel: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlimentoService {
  private apiUrl = 'http://localhost:8080/api/alimentos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Alimento[]> {
    return this.http.get<Alimento[]>(this.apiUrl);
  }

  obterPorId(id: number): Observable<Alimento> {
    return this.http.get<Alimento>(`${this.apiUrl}/${id}`);
  }

  adicionar(alimento: Alimento): Observable<Alimento> {
    return this.http.post<Alimento>(this.apiUrl, alimento);
  }

  atualizar(id: number, alimento: Alimento): Observable<Alimento> {
    return this.http.put<Alimento>(`${this.apiUrl}/${id}`, alimento);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  alterarDisponibilidade(id: number, disponivel: boolean): Observable<Alimento> {
    return this.http.patch<Alimento>(`${this.apiUrl}/${id}/disponibilidade`, { disponivel });
  }
} 