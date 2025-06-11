import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsuarioService, Usuario } from '../../services/usuario.service';
import { EditarUsuarioDialogComponent } from '../dialogs/editar-usuario-dialog.component';

@Component({
  selector: 'app-admin',
  template: `
    <div class="admin-container">
      <mat-toolbar color="primary">
        <span>Painel Administrativo</span>
        <span class="spacer"></span>
        <button mat-icon-button routerLink="/home">
          <mat-icon>home</mat-icon>
        </button>
      </mat-toolbar>

      <div class="content">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Usuários do Sistema</mat-card-title>
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

              <ng-container matColumnDef="senha">
                <th mat-header-cell *matHeaderCellDef> Senha </th>
                <td mat-cell *matCellDef="let element"> {{element.senha}} </td>
              </ng-container>

              <ng-container matColumnDef="saldo">
                <th mat-header-cell *matHeaderCellDef> Saldo </th>
                <td mat-cell *matCellDef="let element"> R$ {{element.saldo}} </td>
              </ng-container>

              <ng-container matColumnDef="tipo">
                <th mat-header-cell *matHeaderCellDef> Tipo </th>
                <td mat-cell *matCellDef="let element"> {{element.tipoUsuario}} </td>
              </ng-container>

              <ng-container matColumnDef="acoes">
                <th mat-header-cell *matHeaderCellDef> Ações </th>
                <td mat-cell *matCellDef="let element">
                  <button mat-icon-button color="primary" (click)="editarUsuario(element)">
                    <mat-icon>edit</mat-icon>
                  </button>
                  <button mat-icon-button color="warn" (click)="excluirUsuario(element)">
                    <mat-icon>delete</mat-icon>
                  </button>
                </td>
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
    .admin-container {
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

    .mat-column-acoes {
      width: 120px;
      text-align: center;
    }
  `]
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'email', 'senha', 'saldo', 'tipo', 'acoes'];
  dataSource!: MatTableDataSource<Usuario>;

  constructor(
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
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

  editarUsuario(usuario: Usuario) {
    const dialogRef = this.dialog.open(EditarUsuarioDialogComponent, {
      data: usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuarioService.atualizar(result.id!, result).subscribe({
          next: () => {
            this.snackBar.open('Usuário atualizado com sucesso', 'Fechar', {
              duration: 3000
            });
            this.carregarUsuarios();
          },
          error: (error) => {
            console.error('Erro ao atualizar usuário:', error);
            this.snackBar.open('Erro ao atualizar usuário', 'Fechar', {
              duration: 3000
            });
          }
        });
      }
    });
  }

  excluirUsuario(usuario: Usuario) {
    if (confirm(`Deseja realmente excluir o usuário ${usuario.nome}?`)) {
      this.usuarioService.excluir(usuario.id!).subscribe({
        next: () => {
          this.snackBar.open('Usuário excluído com sucesso', 'Fechar', {
            duration: 3000
          });
          this.carregarUsuarios();
        },
        error: (error) => {
          console.error('Erro ao excluir usuário:', error);
          this.snackBar.open('Erro ao excluir usuário', 'Fechar', {
            duration: 3000
          });
        }
      });
    }
  }
} 