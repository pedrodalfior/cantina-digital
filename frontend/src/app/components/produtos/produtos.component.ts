import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../../services/produto.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  urlImagem: string;
  quantidadeEstoque: number;
  disponivel: boolean;
}

@Component({
  selector: 'app-produtos',
  template: `
    <div class="produtos-container">
      <h2>Produtos Disponíveis</h2>
      <div class="produtos-grid">
        <mat-card *ngFor="let produto of produtos">
          <img mat-card-image [src]="produto.urlImagem || 'assets/placeholder.png'" [alt]="produto.nome">
          <mat-card-header>
            <mat-card-title>{{ produto.nome }}</mat-card-title>
            <mat-card-subtitle>R$ {{ produto.preco.toFixed(2) }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p>{{ produto.descricao }}</p>
            <p *ngIf="produto.quantidadeEstoque > 0">
              Disponível: {{ produto.quantidadeEstoque }} unidades
            </p>
            <p *ngIf="produto.quantidadeEstoque === 0" class="indisponivel">
              Produto indisponível
            </p>
          </mat-card-content>
          <mat-card-actions>
            <button mat-raised-button color="primary" 
                    [disabled]="produto.quantidadeEstoque === 0"
                    (click)="adicionarAoCarrinho(produto)">
              Adicionar ao Carrinho
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .produtos-container {
      padding: 20px;
    }
    .produtos-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
      padding: 20px 0;
    }
    mat-card {
      max-width: 100%;
      margin-bottom: 20px;
    }
    mat-card img {
      height: 200px;
      object-fit: cover;
    }
    .indisponivel {
      color: red;
      font-weight: bold;
    }
    mat-card-actions {
      padding: 16px;
      display: flex;
      justify-content: center;
    }
  `]
})
export class ProdutosComponent implements OnInit {
  produtos: Produto[] = [];

  constructor(
    private produtoService: ProdutoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listarProdutos().subscribe({
      next: (produtos) => {
        this.produtos = produtos;
      },
      error: (error) => {
        this.snackBar.open('Erro ao carregar produtos', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  adicionarAoCarrinho(produto: Produto) {
    if (produto.quantidadeEstoque > 0) {
      // Aqui você pode implementar a lógica do carrinho
      this.snackBar.open(`${produto.nome} adicionado ao carrinho!`, 'Fechar', {
        duration: 2000
      });
    }
  }
} 