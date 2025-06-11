import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pedido {
  id?: number;
  usuarioId: number;
  alimentoId: number;
  quantidade: number;
  valorTotal: number;
  status: 'PENDENTE' | 'CONFIRMADO' | 'CANCELADO';
  dataPedido: Date;
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'http://localhost:8080/api/pedidos';

  constructor(private http: HttpClient) {}

  listarTodos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.apiUrl);
  }

  obterPorId(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.apiUrl}/${id}`);
  }

  listarPorUsuario(usuarioId: number): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  criar(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }

  atualizar(id: number, pedido: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.apiUrl}/${id}`, pedido);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  atualizarStatus(id: number, status: Pedido['status']): Observable<Pedido> {
    return this.http.patch<Pedido>(`${this.apiUrl}/${id}/status`, { status });
  }
} 