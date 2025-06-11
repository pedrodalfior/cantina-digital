import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alimento } from '../../services/alimento.service';

@Component({
  selector: 'app-editar-alimento-dialog',
  template: `
    <h2 mat-dialog-title>Editar Alimento</h2>
    <mat-dialog-content>
      <form [formGroup]="alimentoForm">
        <mat-form-field appearance="outline">
          <mat-label>Nome do Alimento</mat-label>
          <input matInput formControlName="nome" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>URL da Imagem</mat-label>
          <input matInput formControlName="urlImagem" required>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Valor (R$)</mat-label>
          <input matInput type="number" formControlName="valor" required>
          <span matPrefix>R$&nbsp;</span>
        </mat-form-field>

        <mat-slide-toggle formControlName="disponivel" color="primary">
          Disponível para venda
        </mat-slide-toggle>

        <div class="preview" *ngIf="alimentoForm.get('urlImagem')?.value">
          <img [src]="alimentoForm.get('urlImagem')?.value" 
               alt="Preview do alimento"
               (error)="handleImageError($event)">
        </div>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="cancelar()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="salvar()" [disabled]="alimentoForm.invalid">
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

    .preview {
      margin-top: 16px;
      text-align: center;
    }

    .preview img {
      max-width: 200px;
      max-height: 200px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  `]
})
export class EditarAlimentoDialogComponent {
  alimentoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarAlimentoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alimento
  ) {
    this.alimentoForm = this.fb.group({
      nome: [data.nome, Validators.required],
      urlImagem: [data.urlImagem, Validators.required],
      valor: [data.valor, [Validators.required, Validators.min(0)]],
      disponivel: [data.disponivel ?? true]
    });
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  salvar(): void {
    if (this.alimentoForm.valid) {
      const alimentoAtualizado = {
        ...this.data,
        ...this.alimentoForm.value
      };
      this.dialogRef.close(alimentoAtualizado);
    }
  }

  handleImageError(event: any): void {
    event.target.src = 'assets/placeholder-food.png';
  }
} 