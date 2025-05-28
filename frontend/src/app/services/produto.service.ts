import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  urlImagem: string;
  quantidadeEstoque: number;
  disponivel: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = `${environment.apiUrl}/produtos`;

  constructor(private http: HttpClient) {}

  listarProdutos(): Observable<Produto[]> {
    return this.http.get<Produto[]>(this.apiUrl);
  }

  buscarProdutoPorId(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiUrl}/${id}`);
  }

  buscarProdutosPorNome(nome: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/buscar`, {
      params: { nome }
    });
  }

  buscarProdutosDisponiveis(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiUrl}/disponiveis`);
  }
} 