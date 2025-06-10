import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <mat-toolbar color="primary">
        <span>Cantina Digital</span>
        <span class="spacer"></span>
        <button mat-icon-button [matMenuTriggerFor]="menu">
          <mat-icon>account_circle</mat-icon>
        </button>
        <mat-menu #menu="matMenu">
          <button mat-menu-item (click)="logout()">
            <mat-icon>exit_to_app</mat-icon>
            <span>Sair</span>
          </button>
        </mat-menu>
      </mat-toolbar>

      <div class="content">
        <mat-card>
          <mat-card-header>
            <mat-card-title>Bem-vindo à Cantina Digital</mat-card-title>
          </mat-card-header>
          <mat-card-content>
            <div class="menu-grid">
              <mat-card class="menu-item">
                <mat-icon>restaurant_menu</mat-icon>
                <h3>Cardápio</h3>
                <p>Veja nosso cardápio completo</p>
              </mat-card>

              <mat-card class="menu-item">
                <mat-icon>shopping_cart</mat-icon>
                <h3>Fazer Pedido</h3>
                <p>Faça seu pedido online</p>
              </mat-card>

              <mat-card class="menu-item">
                <mat-icon>account_balance_wallet</mat-icon>
                <h3>Saldo</h3>
                <p>Gerencie seu saldo</p>
              </mat-card>

              <mat-card class="menu-item">
                <mat-icon>history</mat-icon>
                <h3>Histórico</h3>
                <p>Veja seus pedidos anteriores</p>
              </mat-card>
            </div>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
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

    .menu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .menu-item {
      padding: 20px;
      text-align: center;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .menu-item:hover {
      transform: translateY(-5px);
    }

    .menu-item mat-icon {
      font-size: 48px;
      height: 48px;
      width: 48px;
      margin-bottom: 16px;
      color: #3f51b5;
    }

    .menu-item h3 {
      margin: 0;
      font-size: 1.2em;
      color: #333;
    }

    .menu-item p {
      margin: 8px 0 0;
      color: #666;
    }
  `]
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 