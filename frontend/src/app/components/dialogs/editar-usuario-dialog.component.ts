import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../../services/usuario.service';

@Component({
  selector: 'app-editar-usuario-dialog',
  template: `
    <h2 mat-dialog-title>Editar Usuário</h2>
    <mat-dialog-content>
      <form [formGroup]="usuarioForm">
        <mat-form-field appearance="outline">
          <mat-label>Nome</mat-label>
          <input matInput formControlName="nome" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Sobrenome</mat-label>
          <input matInput formControlName="sobrenome" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Email</mat-label>
          <input matInput formControlName="email" required type="email">
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Saldo</mat-label>
          <input matInput formControlName="saldo" required type="number">
          <span matPrefix>R$&nbsp;</span>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Tipo de Usuário</mat-label>
          <mat-select formControlName="tipoUsuario" required>
            <mat-option value="ADMIN">Administrador</mat-option>
            <mat-option value="USUARIO">Usuário</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancelar()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="salvar()" [disabled]="usuarioForm.invalid">
        Salvar
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
      min-width: 400px;
    }

    mat-form-field {
      width: 100%;
    }
  `]
})
export class EditarUsuarioDialogComponent {
  usuarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarUsuarioDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario
  ) {
    this.usuarioForm = this.fb.group({
      nome: [data.nome, Validators.required],
      sobrenome: [data.sobrenome, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      saldo: [data.saldo, [Validators.required, Validators.min(0)]],
      tipoUsuario: [data.tipoUsuario, Validators.required]
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    if (this.usuarioForm.valid) {
      const usuarioAtualizado = {
        ...this.data,
        ...this.usuarioForm.value
      };
      this.dialogRef.close(usuarioAtualizado);
    }
  }
} 