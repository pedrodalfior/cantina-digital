import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface MenuItem {
  title: string;
  description: string;
  icon: string;
  route: string;
  adminOnly?: boolean;
}

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <mat-toolbar color="primary">
        <span>Cantina Digital</span>
        <span class="spacer"></span>
        <button mat-icon-button (click)="logout()">
          <mat-icon>exit_to_app</mat-icon>
        </button>
      </mat-toolbar>

      <div class="content">
        <div class="menu-grid">
          <ng-container *ngFor="let item of menuItems">
            <mat-card *ngIf="!item.adminOnly || isAdmin"
                     [routerLink]="item.route"
                     class="menu-card"
                     [class.admin-card]="item.adminOnly">
              <mat-card-header>
                <mat-icon mat-card-avatar>{{item.icon}}</mat-icon>
                <mat-card-title>{{item.title}}</mat-card-title>
              </mat-card-header>
              <mat-card-content>
                <p>{{item.description}}</p>
              </mat-card-content>
            </mat-card>
          </ng-container>
        </div>
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
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      padding: 20px;
    }

    .menu-card {
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .menu-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .admin-card {
      border-left: 4px solid #f44336;
    }

    mat-card-header {
      margin-bottom: 16px;
    }

    mat-icon {
      font-size: 32px;
      width: 32px;
      height: 32px;
      color: #1976d2;
    }

    .admin-card mat-icon {
      color: #f44336;
    }
  `]
})
export class HomeComponent implements OnInit {
  menuItems: MenuItem[] = [
    {
      title: 'Consultar Saldo',
      description: 'Verifique seu saldo atual',
      icon: 'account_balance_wallet',
      route: '/consulta-saldo'
    },
    {
      title: 'Consultar Pedidos',
      description: 'Veja seu histórico de pedidos',
      icon: 'receipt_long',
      route: '/consulta-pedidos'
    },
    {
      title: 'Cardápio',
      description: 'Veja os alimentos disponíveis',
      icon: 'restaurant_menu',
      route: '/alimentos'
    },
    {
      title: 'Administração',
      description: 'Gerenciar usuários e configurações',
      icon: 'admin_panel_settings',
      route: '/admin',
      adminOnly: true
    }
  ];

  isAdmin = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
  }

  logout() {
    this.authService.logout();
  }
} 