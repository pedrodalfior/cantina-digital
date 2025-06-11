import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlimentoService, Alimento } from '../../services/alimento.service';
import { EditarAlimentoDialogComponent } from '../dialogs/editar-alimento-dialog.component';

@Component({
  selector: 'app-alimentos',
  template: `
    <div class="alimentos-container">
      <mat-toolbar color="primary">
        <span>Gerenciamento de Alimentos</span>
        <span class="spacer"></span>
        <button mat-icon-button routerLink="/home">
          <mat-icon>home</mat-icon>
        </button>
      </mat-toolbar>

      <div class="content">
        <div class="grid">
          <mat-card *ngFor="let alimento of alimentos">
            <img mat-card-image [src]="alimento.urlImagem" 
                 [alt]="alimento.nome"
                 (error)="handleImageError($event)">
            <mat-card-content>
              <h2>{{alimento.nome}}</h2>
              <p class="price">R$ {{alimento.valor}}</p>
              <p class="status" [class.disponivel]="alimento.disponivel">
                {{alimento.disponivel ? 'Disponível' : 'Indisponível'}}
              </p>
            </mat-card-content>
            <mat-card-actions>
              <button mat-icon-button color="primary" (click)="editarAlimento(alimento)">
                <mat-icon>edit</mat-icon>
              </button>
              <button mat-icon-button color="warn" (click)="excluirAlimento(alimento)">
                <mat-icon>delete</mat-icon>
              </button>
            </mat-card-actions>
          </mat-card>

          <mat-card class="add-card" (click)="adicionarAlimento()">
            <mat-icon>add</mat-icon>
            <p>Adicionar Novo Alimento</p>
          </mat-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .alimentos-container {
      min-height: 100vh;
      background-color: #f5f5f5;
    }

    .spacer {
      flex: 1 1 auto;
    }

    .content {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      padding: 20px;
    }

    mat-card {
      transition: transform 0.2s;
    }

    mat-card:hover {
      transform: translateY(-5px);
    }

    .add-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      height: 100%;
      min-height: 200px;
    }

    .add-card mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 16px;
    }

    img {
      height: 200px;
      object-fit: cover;
    }

    .price {
      font-size: 1.2em;
      font-weight: bold;
      color: #2196f3;
    }

    .status {
      color: #f44336;
    }

    .status.disponivel {
      color: #4caf50;
    }

    mat-card-actions {
      display: flex;
      justify-content: flex-end;
      padding: 8px;
    }
  `]
})
export class AlimentosComponent implements OnInit {
  alimentos: Alimento[] = [];

  constructor(
    private alimentoService: AlimentoService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.carregarAlimentos();
  }

  carregarAlimentos() {
    this.alimentoService.listarTodos().subscribe({
      next: (alimentos: Alimento[]) => {
        this.alimentos = alimentos;
      },
      error: (error: any) => {
        console.error('Erro ao carregar alimentos:', error);
        this.snackBar.open('Erro ao carregar alimentos', 'Fechar', {
          duration: 3000
        });
      }
    });
  }

  editarAlimento(alimento: Alimento) {
    const dialogRef = this.dialog.open(EditarAlimentoDialogComponent, {
      data: alimento
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alimentoService.atualizar(result.id!, result).subscribe({
          next: () => {
            this.snackBar.open('Alimento atualizado com sucesso', 'Fechar', {
              duration: 3000
            });
            this.carregarAlimentos();
          },
          error: (error: any) => {
            console.error('Erro ao atualizar alimento:', error);
            this.snackBar.open('Erro ao atualizar alimento', 'Fechar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  adicionarAlimento() {
    const novoAlimento: Alimento = {
      nome: '',
      urlImagem: '',
      valor: 0,
      disponivel: true
    };

    const dialogRef = this.dialog.open(EditarAlimentoDialogComponent, {
      data: novoAlimento
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.alimentoService.adicionar(result).subscribe({
          next: () => {
            this.snackBar.open('Alimento adicionado com sucesso', 'Fechar', {
              duration: 3000
            });
            this.carregarAlimentos();
          },
          error: (error: any) => {
            console.error('Erro ao adicionar alimento:', error);
            this.snackBar.open('Erro ao adicionar alimento', 'Fechar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  excluirAlimento(alimento: Alimento) {
    if (confirm(`Deseja realmente excluir o alimento ${alimento.nome}?`)) {
      this.alimentoService.excluir(alimento.id!).subscribe({
        next: () => {
          this.snackBar.open('Alimento excluído com sucesso', 'Fechar', {
            duration: 3000
          });
          this.carregarAlimentos();
        },
        error: (error: any) => {
          console.error('Erro ao excluir alimento:', error);
          this.snackBar.open('Erro ao excluir alimento', 'Fechar', {
            duration: 3000
          });
        }
      });
    }
  }

  handleImageError(event: any) {
    event.target.src = 'assets/placeholder-food.png';
  }
} 