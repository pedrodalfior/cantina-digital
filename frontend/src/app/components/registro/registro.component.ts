import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
          <button mat-button (click)="irParaLogin()">
            Já tem uma conta? Faça login
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .registro-container {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background-color: #f5f5f5;
    }
    
    mat-card {
      max-width: 400px;
      width: 90%;
      padding: 20px;
    }
    
    form {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    
    mat-form-field {
      width: 100%;
    }
    
    button[type="submit"] {
      margin-top: 16px;
    }
    
    mat-card-actions {
      display: flex;
      justify-content: center;
      margin-top: 16px;
    }
  `]
})
export class RegistroComponent {
  registroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registroForm = this.fb.group({
      nome: ['', Validators.required],
      sobrenome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      this.authService.registrar(this.registroForm.value).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Erro no registro:', error);
          // Aqui você pode adicionar uma mensagem de erro para o usuário
        }
      });
    }
  }

  irParaLogin(): void {
    this.router.navigate(['/login']);
  }
} 