import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">
      <span>Cantina Digital</span>
      <span class="spacer"></span>
      <ng-container *ngIf="!isLoggedIn">
        <button mat-button routerLink="/login">Login</button>
        <button mat-button routerLink="/registro">Registro</button>
      </ng-container>
      <ng-container *ngIf="isLoggedIn">
        <button mat-button routerLink="/produtos">Produtos</button>
        <button mat-button (click)="logout()">Sair</button>
      </ng-container>
    </mat-toolbar>
  `,
  styles: [`
    .spacer {
      flex: 1 1 auto;
    }
    button {
      margin-left: 8px;
    }
  `]
})
export class HeaderComponent {
  isLoggedIn = false;

  constructor(private router: Router) {
    // Aqui você pode adicionar a lógica para verificar se o usuário está logado
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
} 