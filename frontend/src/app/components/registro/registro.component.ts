import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  template: `
    <div class="registro-container">
      <mat-card>
        <mat-card-header>
          <mat-card-title>Registro</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <form [formGroup]="registroForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline">
              <mat-label>Nome</mat-label>
              <input matInput formControlName="nome" required>
              <mat-error *ngIf="registroForm.get('nome')?.hasError('required')">
                Nome é obrigatório
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Sobrenome</mat-label>
              <input matInput formControlName="sobrenome" required>
              <mat-error *ngIf="registroForm.get('sobrenome')?.hasError('required')">
                Sobrenome é obrigatório
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email" required>
              <mat-error *ngIf="registroForm.get('email')?.hasError('required')">
                Email é obrigatório
              </mat-error>
              <mat-error *ngIf="registroForm.get('email')?.hasError('email')">
                Email inválido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Senha</mat-label>
              <input matInput type="password" formControlName="senha" required>
              <mat-error *ngIf="registroForm.get('senha')?.hasError('required')">
                Senha é obrigatória
              </mat-error>
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit" [disabled]="registroForm.invalid">
              Registrar
            </button>
          </form>
        </mat-card-content>
        <mat-card-actions>
          <button mat-button routerLink="/login">Já tem uma conta? Faça login</button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .registro-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: calc(100vh - 100px);
    }
    mat-card {
      max-width: 400px;
      width: 100%;
      padding: 20px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    mat-card-actions {
      display: flex;
      justify-content: center;
    }
  `]
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registroForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      this.authService.registro(this.registroForm.value).subscribe({
        next: () => {
          this.snackBar.open('Registro realizado com sucesso!', 'Fechar', {
            duration: 3000
          });
          this.router.navigate(['/login']);
        },
        error: (error) => {
          this.snackBar.open('Erro ao realizar registro. Tente novamente.', 'Fechar', {
            duration: 3000
          });
        }
      });
    }
  }
} 