import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService, Usuario } from '../../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  template: `
    <div class="usuarios-container">
      <mat-toolbar color="primary">
        <span>Lista de Usuários</span>
        <span class="spacer"></span>
        <button mat-icon-button routerLink="/home">
          <mat-icon>home</mat-icon>
        </button>
      </mat-toolbar>

      <div class="content">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Usuários</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <mat-form-field appearance="outline">
              <mat-label>Filtrar</mat-label>
              <input matInput (keyup)="applyFilter($event)" placeholder="Ex. João" #input>
            </mat-form-field>

            <table mat-table [dataSource]="dataSource" class="mat-elevation-z8">
              <ng-container matColumnDef="nome">
                <th mat-header-cell *matHeaderCellDef> Nome </th>
                <td mat-cell *matCellDef="let element"> {{element.nome}} {{element.sobrenome}} </td>
              </ng-container>

              <ng-container matColumnDef="email">
                <th mat-header-cell *matHeaderCellDef> Email </th>
                <td mat-cell *matCellDef="let element"> {{element.email}} </td>
              </ng-container>

              <ng-container matColumnDef="tipo">
                <th mat-header-cell *matHeaderCellDef> Tipo </th>
                <td mat-cell *matCellDef="let element"> {{element.tipoUsuario}} </td>
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
    .usuarios-container {
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
export class UsuariosComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'email', 'tipo'];
  dataSource!: MatTableDataSource<Usuario>;

  constructor(
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.usuarioService.listarTodos().subscribe({
      next: (usuarios) => {
        this.dataSource.data = usuarios;
      },
      error: (error) => {
        console.error('Erro ao carregar usuários:', error);
        this.snackBar.open('Erro ao carregar usuários', 'Fechar', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
} 