import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PedidoService, Pedido } from '../../services/pedido.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-consulta-pedidos',
  template: `
    <div class="pedidos-container">
      <mat-toolbar color="primary">
        <span>Consulta de Pedidos</span>
        <span class="spacer"></span>
        <button mat-icon-button routerLink="/home">
          <mat-icon>home</mat-icon>
        </button>
      </mat-toolbar>

      <div class="content">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Pedidos</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-form-field appearance="outline">
              <mat-label>Buscar por nome</mat-label>
              <input matInput (keyup)="buscarPorNome($event)" placeholder="Ex. João">
            </mat-form-field>

            <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
              <ng-container matColumnDef="data">
                <th mat-header-cell *matHeaderCellDef> Data </th>
                <td mat-cell *matCellDef="let element"> {{element.dataPedido | date:'dd/MM/yyyy HH:mm'}} </td>
              </ng-container>

              <ng-container matColumnDef="usuario">
                <th mat-header-cell *matHeaderCellDef> Usuário </th>
                <td mat-cell *matCellDef="let element"> {{element.usuario?.nome}} {{element.usuario?.sobrenome}} </td>
              </ng-container>

              <ng-container matColumnDef="itens">
                <th mat-header-cell *matHeaderCellDef> Itens </th>
                <td mat-cell *matCellDef="let element"> {{element.itens?.length || 0}} </td>
              </ng-container>

              <ng-container matColumnDef="valor">
                <th mat-header-cell *matHeaderCellDef> Valor Total </th>
                <td mat-cell *matCellDef="let element"> R$ {{element.valorTotal}} </td>
              </ng-container>

              <ng-container matColumnDef="status">
                <th mat-header-cell *matHeaderCellDef> Status </th>
                <td mat-cell *matCellDef="let element"> {{element.status}} </td>
              </ng-container>

              <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
              <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
            </table>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .pedidos-container {
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

    mat-form-field {
      width: 100%;
      margin-bottom: 20px;
    }

    table {
      width: 100%;
    }
  `]
})
export class ConsultaPedidosComponent implements OnInit {
  displayedColumns: string[] = ['data', 'usuario', 'itens', 'valor', 'status'];
  dataSource!: MatTableDataSource<Pedido>;

  constructor(
    private pedidoService: PedidoService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.carregarPedidos();
  }

  carregarPedidos() {
    this.pedidoService.listarTodos().subscribe({
      next: (pedidos) => {
        this.dataSource.data = pedidos;
      },
      error: (error: any) => {
        console.error('Erro ao carregar pedidos:', error);
        this.snackBar.open('Erro ao carregar pedidos', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    });
  }

  buscarPorNome(event: Event) {
    const nome = (event.target as HTMLInputElement).value;
    if (nome.length >= 3) {
      this.usuarioService.buscarPorNome(nome).subscribe({
        next: (usuarios) => {
          if (usuarios.length > 0) {
            const usuario = usuarios[0];
            this.pedidoService.listarPorUsuario(usuario.id!).subscribe({
              next: (pedidos) => {
                this.dataSource.data = pedidos;
              },
              error: (error) => {
                console.error('Erro ao buscar pedidos:', error);
                this.snackBar.open('Erro ao buscar pedidos', 'Fechar', {
                  duration: 3000
                });
              }
            });
          } else {
            this.dataSource.data = [];
          }
        },
        error: (error) => {
          console.error('Erro ao buscar usuário:', error);
          this.snackBar.open('Erro ao buscar usuário', 'Fechar', {
            duration: 3000
          });
        }
      });
    } else if (nome.length === 0) {
      this.carregarPedidos();
    }
  }
} 