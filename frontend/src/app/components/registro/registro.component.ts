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
              <input matInput formControlName="email" type="email" required>
              <mat-error *ngIf="registroForm.get('email')?.hasError('required')">
                Email é obrigatório
              </mat-error>
              <mat-error *ngIf="registroForm.get('email')?.hasError('email')">
                Email inválido
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Senha</mat-label>
              <input matInput formControlName="senha" type="password" required>
              <mat-error *ngIf="registroForm.get('senha')?.hasError('required')">
                Senha é obrigatória
              </mat-error>
            </mat-form-field>

            <div class="form-actions">
              <button mat-raised-button color="primary" type="submit" [disabled]="registroForm.invalid">
                Registrar
              </button>
              <button mat-button type="button" routerLink="/login">
                Voltar para login
              </button>
            </div>
          </form>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styles: [`
    .registro-container {
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #f5f5f5;
    }
    
    mat-card {
      max-width: 400px;
      width: 90%;
      margin: 2rem;
    }
    
    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem 0;
    }
    
    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 1rem;
    }
    
    mat-form-field {
      width: 100%;
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
      senha: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      this.authService.register(this.registroForm.value).subscribe({
        next: () => {
          this.snackBar.open('Registro realizado com sucesso!', 'Fechar', {
            duration: 3000
          });
          this.router.navigate(['/login']);
        },
        error: (error: any) => {
          console.error('Erro no registro:', error);
          this.snackBar.open('Erro ao realizar registro', 'Fechar', {
            duration: 3000
          });
        }
      });
    }
  }
} 